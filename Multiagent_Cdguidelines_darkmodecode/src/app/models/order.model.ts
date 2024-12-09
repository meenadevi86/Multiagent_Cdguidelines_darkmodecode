export class Order {
  orderId: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(orderId: string, userId: string, totalPrice: number, status: string, createdAt: Date, updatedAt: Date) {
    this.orderId = orderId;
    this.userId = userId;
    this.totalPrice = totalPrice;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Method to add an item to the order
  addItem(orderItem: OrderItem): void {
    // Logic to add item to the order
  }

  // Method to remove an item from the order
  removeItem(orderItemId: string): void {
    // Logic to remove item from the order
  }

  // Method to update the quantity of an item in the order
  updateItemQuantity(orderItemId: string, quantity: number): void {
    // Logic to update item quantity in the order
  }

  // Method to calculate the total price of the order
  calculateTotalPrice(): number {
    // Logic to calculate total price
    return this.totalPrice;
  }

  // Method to apply a discount to the order
  applyDiscount(discount: number): void {
    // Logic to apply discount to the order
  }

  // Method to update the status of the order
  updateStatus(status: string): void {
    this.status = status;
    this.updatedAt = new Date();
  }
}

export class OrderItem {
  orderItemId: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
  discountAtPurchase: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(orderItemId: string, orderId: string, productId: string, quantity: number, priceAtPurchase: number, discountAtPurchase: number, createdAt: Date, updatedAt: Date) {
    this.orderItemId = orderItemId;
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.priceAtPurchase = priceAtPurchase;
    this.discountAtPurchase = discountAtPurchase;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
