'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { InventoryItem, SaleDetails, FullSale } from '@/types/data';

interface DataContextType {
	items: InventoryItem[];
	sales: FullSale[];
	addItem: (item: Omit<InventoryItem, 'id' | 'dateAdded' | 'status'>) => void;
	sellItem: (
		itemId: string,
		details: Omit<SaleDetails, 'itemId' | 'dateSold'>,
		overrides?: Partial<InventoryItem>
	) => void;
	updateItem: (itemId: string, updates: Partial<InventoryItem>) => void;
	deleteItem: (itemId: string) => void;
	isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
	const [items, setItems] = useState<InventoryItem[]>([]);
	const [sales, setSales] = useState<FullSale[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	// Load from LocalStorage on mount
	useEffect(() => {
		const loadData = () => {
			const savedItems = localStorage.getItem('resellz_items');
			const savedSales = localStorage.getItem('resellz_sales');

			if (savedItems) setItems(JSON.parse(savedItems));
			if (savedSales) setSales(JSON.parse(savedSales));
			setIsLoading(false);
		};
		loadData();
	}, []);

	// Save to LocalStorage whenever state changes
	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem('resellz_items', JSON.stringify(items));
			localStorage.setItem('resellz_sales', JSON.stringify(sales));
		}
	}, [items, sales, isLoading]);

	const addItem = (
		item: Omit<InventoryItem, 'id' | 'dateAdded' | 'status'>
	) => {
		const newItem: InventoryItem = {
			...item,
			quantity: item.quantity || 1,
			id: crypto.randomUUID(),
			dateAdded: new Date().toISOString(),
			status: 'Available',
		};
		setItems((prev) => [newItem, ...prev]);
	};

	const updateItem = (itemId: string, updates: Partial<InventoryItem>) => {
		setItems((prev) =>
			prev.map((item) =>
				item.id === itemId ? { ...item, ...updates } : item
			)
		);
	};

	const sellItem = (
		itemId: string,
		details: Omit<SaleDetails, 'itemId' | 'dateSold'>,
		overrides?: Partial<InventoryItem>
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
				// Calculate how many were actually sold in this transaction
				// Ensure at least 1 is recorded if they clicked sell, otherwise 0 logic might hide profit
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
		};

		setItems(updatedItems);
		setSales((prev) => [newSale, ...prev]);
	};

	const deleteItem = (itemId: string) => {
		setItems((prev) => prev.filter((i) => i.id !== itemId));
		setSales((prev) => prev.filter((s) => s.itemId !== itemId)); // Cascade delete sales if item is deleted
	};

	return (
		<DataContext.Provider
			value={{
				items,
				sales,
				addItem,
				updateItem,
				sellItem,
				deleteItem,
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
