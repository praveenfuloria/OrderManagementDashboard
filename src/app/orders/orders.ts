import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Order } from '../models/order.model';

@Component({
  imports: [CommonModule],
  selector: 'app-orders',
  styleUrl: './orders.css',
  templateUrl: './orders.html',
})
export class Orders {
  // Demo Data (Mock Order)
  // This object simulates a real API response so your template can display:
  // - Order summary (id, date, status)
  // - Customer details
  // - Address details
  // - Payment info
  // - Item list + totals
  //
  // Having it typed as Order ensures:
  // - compile-time checking (no missing fields)
  // - IntelliSense/autocomplete
  // - safer refactoring
  order: Order = {
    orderId: 'ORD-2026-2049',
    orderDate: new Date('2026-02-01T10:35:00'),
    status: 'Shipped',
    customer: {
      customerId: 101,
      fullName: 'pranaya rout',
      email: 'pranaya@example.com',
      mobile: '+91 98765 43210',
      isPremium: true,
    },
    deliveryAddress: {
      line1: 'Plot 12, Jayadev Vihar',
      line2: 'Near Main Road',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751013',
    },
    payment: {
      method: 'UPI',
      transactionId: 'UPI-9F2A1XK81',
      paidOn: new Date('2026-02-01T10:36:00'),
      paymentStatus: 'Paid',
    },
    items: [
      {
        sku: 'KB-1021',
        productName: 'mechanical keyboard',
        unitPrice: 3499.5,
        quantity: 1,
        discountPercent: 10,
        gstPercent: 18,
        lineTotal: 3716.47,
      },
      {
        sku: 'MS-3090',
        productName: 'wireless mouse',
        unitPrice: 899,
        quantity: 2,
        discountPercent: 5,
        gstPercent: 18,
        lineTotal: 2016.06,
      },
      {
        sku: 'HB-2201',
        productName: 'usb hub',
        unitPrice: 649,
        quantity: 1,
        discountPercent: 0,
        gstPercent: 18,
        lineTotal: 765.82,
      },
    ],
    totals: {
      subTotalTaxable: 5506.65,
      totalGst: 991.2,
      grandTotal: 6497.85,
    },
  };
  // UI Helper: Total quantity of items in this order
  // Loop through each item and add its quantity.
  getTotalItems(order: Order): number {
    let total = 0;
    // Go through every item in the order
    for (const item of order.items) {
      total += item.quantity; // add current item's quantity to total
    }
    return total;
  }
  // UI Helper: Returns a Bootstrap badge class based on Order Status
  // Purpose:
  // - Keep the HTML clean (template only calls this method)
  // - Centralize "status → badge color" mapping in one place
  //
  // Example output:
  // 'bg-primary' means blue badge
  // 'bg-success' means green badge
  getStatusBadgeClass(status: Order['status']): string {
    switch (status) {
      case 'Delivered':
        return 'bg-success'; // green → completed
      case 'Shipped':
        return 'bg-primary'; // blue → in transit
      case 'Packed':
        return 'bg-warning text-dark'; // yellow → ready, warning tone
      case 'Placed':
        return 'bg-info text-dark'; // light blue → newly created
      case 'Cancelled':
        return 'bg-danger'; // red → cancelled
      default:
        return 'bg-secondary'; // grey → unknown/other
    }
  }
  // UI Helper: Returns a Bootstrap badge class based on Payment Status
  // This is separate from order status because payment has its own lifecycle.
  //
  // Example:
  // Paid → green, Pending → yellow, Failed → red
  getPaymentBadgeClass(status: Order['payment']['paymentStatus']): string {
    switch (status) {
      case 'Paid':
        return 'bg-success'; // green → success
      case 'Pending':
        return 'bg-warning text-dark'; // yellow → waiting
      case 'Failed':
        return 'bg-danger'; // red → failure
      default:
        return 'bg-secondary'; // grey → unknown/other
    }
  }
}
