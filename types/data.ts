export type ItemStatus = 'Available' | 'Sold' | 'Pending';

export interface InventoryItemVariant {
	size: string;
	quantity: number;
	marketPrice?: number; // Optional override for specific variant pricing
	purchasePrice?: number; // Optional override for specific variant cost
}

export interface InventoryItem {
	id: string;
	name: string;
	sku: string;
	brand: string;
	size: string;
	purchasePrice: number;
	marketPrice: number;
	status: ItemStatus;
	quantity: number;
	soldQuantity: number;
	dateAdded: string; // ISO String
	notes?: string;
	imageUrl?: string;
	variants?: InventoryItemVariant[];
}

export interface SaleDetails {
	itemId: string;
	salePrice: number;
	platformFees: number;
	shippingCost: number;
	dateSold: string; // ISO String
	variantSold?: string;
}

export interface FullSale extends SaleDetails {
	id: string;
	item: InventoryItem;
	quantitySold: number;
	netProfit: number;
	variantSold?: string;
}

export type HistoryActionType =
	| 'ADD_ITEM'
	| 'SELL_ITEM'
	| 'UPDATE_ITEM'
	| 'DELETE_ITEM';

export interface HistoryAction {
	id: string;
	type: HistoryActionType;
	timestamp: string; // ISO String
	description: string;
	itemId?: string;
	previousItemState?: InventoryItem;
	saleId?: string;
	soldQuantity?: number;
	relatedSales?: FullSale[];
}
