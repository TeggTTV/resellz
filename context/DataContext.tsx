'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
	InventoryItem,
	SaleDetails,
	FullSale,
	HistoryAction,
	HistoryActionType,
} from '@/types/data';

interface DataContextType {
	items: InventoryItem[];
	sales: FullSale[];
	history: HistoryAction[];
	addItem: (
		item: Omit<InventoryItem, 'id' | 'dateAdded' | 'status'>,
		skipHistory?: boolean
	) => void;
	sellItem: (
		itemId: string,
		details: Omit<SaleDetails, 'itemId' | 'dateSold'>,
		overrides?: Partial<InventoryItem>,
		skipHistory?: boolean
	) => void;
	updateItem: (
		itemId: string,
		updates: Partial<InventoryItem>,
		skipHistory?: boolean
	) => void;
	deleteItem: (itemId: string, skipHistory?: boolean) => void;
	undoAction: (actionId: string) => void;
	isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<InventoryItem[]>([]);
	const [sales, setSales] = useState<FullSale[]>([]);
	const [history, setHistory] = useState<HistoryAction[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load from LocalStorage on mount
	useEffect(() => {
		const loadData = () => {
			const savedItems = localStorage.getItem('resellz_items');
			const savedSales = localStorage.getItem('resellz_sales');
			const savedHistory = localStorage.getItem('resellz_history');

			if (savedItems) setItems(JSON.parse(savedItems));
			if (savedSales) setSales(JSON.parse(savedSales));
			if (savedHistory) setHistory(JSON.parse(savedHistory));
			setIsLoading(false);
		};
		loadData();
	}, []);

	// Save to LocalStorage whenever state changes
	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('resellz_items', JSON.stringify(items));
			localStorage.setItem('resellz_sales', JSON.stringify(sales));
			localStorage.setItem('resellz_history', JSON.stringify(history));
		}
	}, [items, sales, history, isLoading]);

	const addToHistory = (action: Omit<HistoryAction, 'id' | 'timestamp'>) => {
		const newAction: HistoryAction = {
			...action,
			id: crypto.randomUUID(),
			timestamp: new Date().toISOString(),
		};
		setHistory((prev) => [newAction, ...prev]);
	};

	const addItem = (
		item: Omit<InventoryItem, 'id' | 'dateAdded' | 'status'>,
		skipHistory = false
	) => {
		// If item has an ID (restoring from history), keep it, otherwise generate new
		const id = (item as any).id || crypto.randomUUID();

		const newItem: InventoryItem = {
			...item,
			quantity: item.quantity || 1,
			id: id,
			dateAdded: (item as any).dateAdded || new Date().toISOString(),
			status: (item as any).status || 'Available',
		};
		setItems((prev) => [newItem, ...prev]);

		if (!skipHistory) {
			addToHistory({
				type: 'ADD_ITEM',
				description: `Added item: ${newItem.name || 'Unknown Item'}`,
				itemId: newItem.id,
			});
		}
	};

	const updateItem = (
		itemId: string,
		updates: Partial<InventoryItem>,
		skipHistory = false
	) => {
		const itemIndex = items.findIndex((i) => i.id === itemId);
		if (itemIndex === -1 && !skipHistory) return;

		const previousItem = items[itemIndex];

		setItems((prev) =>
			prev.map((item) =>
				item.id === itemId ? { ...item, ...updates } : item
			)
		);

		if (!skipHistory && previousItem) {
			addToHistory({
				type: 'UPDATE_ITEM',
				description: `Updated item: ${previousItem.name}`,
				itemId: itemId,
				previousItemState: previousItem,
			});
		}
	};

	const sellItem = (
		itemId: string,
		details: Omit<SaleDetails, 'itemId' | 'dateSold'>,
		overrides?: Partial<InventoryItem>,
		skipHistory = false
	) => {
		const itemIndex = items.findIndex((i) => i.id === itemId);
		if (itemIndex === -1) return;

		const item = items[itemIndex];
		const updatedItems = [...items];

		// Default Auto-Decrement Logic
		let newSoldQuantity = (item.soldQuantity || 0) + 1;
		let newQuantity = item.quantity;
		let newStatus = item.status;
		let soldCountForTx = 1;

		if (item.quantity > 1) {
			newQuantity = item.quantity - 1;
		} else {
			newQuantity = 0;
			newStatus = 'Sold';
		}

		// Apply Overrides if provided (Manual Control)
		if (overrides) {
			if (overrides.quantity !== undefined)
				newQuantity = overrides.quantity;

			if (overrides.soldQuantity !== undefined) {
				const currentSold = item.soldQuantity || 0;
				soldCountForTx = Math.max(
					1,
					overrides.soldQuantity - currentSold
				);
				newSoldQuantity = overrides.soldQuantity;
			}

			if (overrides.status !== undefined) newStatus = overrides.status;
		}

		updatedItems[itemIndex] = {
			...item,
			status: newStatus,
			quantity: newQuantity,
			soldQuantity: newSoldQuantity,
		};

		const unitProfit =
			details.salePrice -
			details.platformFees -
			details.shippingCost -
			item.purchasePrice;

		const newSale: FullSale = {
			id: crypto.randomUUID(),
			itemId,
			item: { ...item, quantity: 1 }, // Record sale of 1 unit snapshot
			...details,
			quantitySold: soldCountForTx,
			dateSold: new Date().toISOString(),
			netProfit: unitProfit * soldCountForTx,
			variantSold: details.variantSold,
		};

		setItems(updatedItems);
		setSales((prev) => [newSale, ...prev]);

		if (!skipHistory) {
			addToHistory({
				type: 'SELL_ITEM',
				description: `Sold item: ${item.name}`,
				itemId: itemId,
				saleId: newSale.id,
				soldQuantity: soldCountForTx,
			});
		}
	};

	const deleteItem = (itemId: string, skipHistory = false) => {
		const itemToDelete = items.find((i) => i.id === itemId);
		const relatedSales = sales.filter((s) => s.itemId === itemId);

		if (!itemToDelete && !skipHistory) return;

		setItems((prev) => prev.filter((i) => i.id !== itemId));
		setSales((prev) => prev.filter((s) => s.itemId !== itemId));

		if (!skipHistory && itemToDelete) {
			addToHistory({
				type: 'DELETE_ITEM',
				description: `Deleted item: ${itemToDelete.name}`,
				previousItemState: itemToDelete,
				relatedSales: relatedSales,
			});
		}
	};

	const undoAction = (actionId: string) => {
		const action = history.find((a) => a.id === actionId);
		if (!action) return;

		// Perform reverse operation WITHOUT adding to history
		switch (action.type) {
			case 'ADD_ITEM':
				if (action.itemId) {
					deleteItem(action.itemId, true);
				}
				break;
			case 'SELL_ITEM':
				if (action.itemId && action.saleId) {
					// 1. Remove the sale
					setSales((prev) =>
						prev.filter((s) => s.id !== action.saleId)
					);

					// 2. Restore item quantity
					const item = items.find((i) => i.id === action.itemId);
					if (item) {
						updateItem(
							action.itemId,
							{
								quantity:
									(item.quantity || 0) +
									(action.soldQuantity || 1),
								soldQuantity: Math.max(
									0,
									(item.soldQuantity || 0) -
										(action.soldQuantity || 1)
								),
								status: 'Available', // Revert to available if it was sold out
							},
							true
						);
					}
				}
				break;
			case 'UPDATE_ITEM':
				if (action.itemId && action.previousItemState) {
					updateItem(action.itemId, action.previousItemState, true);
				}
				break;
			case 'DELETE_ITEM':
				if (action.previousItemState) {
					// Restore item
					addItem(action.previousItemState, true);

					// Restore sales
					if (action.relatedSales && action.relatedSales.length > 0) {
						setSales((prev) => [...action.relatedSales!, ...prev]);
					}
				}
				break;
		}

		// Remove the action from history
		setHistory((prev) => prev.filter((a) => a.id !== actionId));
	};

	return (
		<DataContext.Provider
			value={{
				items,
				sales,
				history,
				addItem,
				updateItem,
				sellItem,
				deleteItem,
				undoAction,
				isLoading,
			}}
		>
			{children}
		</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error('useData must be used within a DataProvider');
	}
	return context;
}
