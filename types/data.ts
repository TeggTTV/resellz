export type ItemStatus = 'Available' | 'Sold' | 'Pending';

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
}

export interface SaleDetails {
	itemId: string;
	salePrice: number;
	platformFees: number;
	shippingCost: number;
	dateSold: string; // ISO String
}

export interface FullSale extends SaleDetails {
	id: string;
	item: InventoryItem;
	quantitySold: number;
	netProfit: number;
}
