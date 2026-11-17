/**
 * Address
 * Represents a delivery address (or billing address).
 * Kept as a separate interface so it can be reused across multiple models.
 */
export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

/**
 * Customer
 * Basic customer information returned along with the order details.
 * In real systems, this might come from a separate "Customer Service" or "User Service".
 */
export interface Customer {
  customerId: number;
  fullName: string;
  email: string;
  mobile: string;
  isPremium: boolean;
}

/**
 * PaymentInfo
 * Payment details for the order.
 */
export interface PaymentInfo {
  method: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  transactionId?: string;
  paidOn?: Date;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
}

/**
 * OrderItem
 * A single line item in the order.
 */
export interface OrderItem {
  sku: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  discountPercent: number;
  gstPercent: number;
  lineTotal: number;
}

/**
 * OrderTotals
 * Final totals returned by the API (source of truth).
 * UI shows these values directly.
 */
export interface OrderTotals {
  subTotalTaxable: number;
  totalGst: number;
  grandTotal: number;
}

/**
 * Order (Main Contract)
 * The complete Order Details response returned by API.
 *
 * This model is designed specifically for an "Order Details" page:
 * - Includes customer, address, payment, item list
 * - Includes server-calculated totals (totals + lineTotal)
 * - UI uses pipes to format date, currency, percent, etc.
 */
export interface Order {
  orderId: string;
  orderDate: Date;
  status: 'Placed' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled';
  customer: Customer;
  deliveryAddress: Address;
  payment: PaymentInfo;
  items: OrderItem[];
  totals: OrderTotals;
}
