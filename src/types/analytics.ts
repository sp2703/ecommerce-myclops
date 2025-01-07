export interface AnalyticsConfig {
  trackingID: string;
}

export interface TrackingEvent {
  userId: string;
  productId?: string;
  productIds?: string[];
  productCost?: number;
  cartValue?: number;
  currency?: string;
  productName?: string;
  pageUrl?: string;
  searchTerm?: string;
}
