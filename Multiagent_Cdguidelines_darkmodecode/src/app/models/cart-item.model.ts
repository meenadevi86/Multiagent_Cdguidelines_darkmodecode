export class CartItem {
  cart_item_id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  price_at_addition: number;
  discount_at_addition: number;
  created_at: Date;
  updated_at: Date;

  constructor(
    cart_item_id: number,
    cart_id: number,
    product_id: number,
    quantity: number,
    price_at_addition: number,
    discount_at_addition: number,
    created_at: Date,
    updated_at: Date
  ) {
    this.cart_item_id = cart_item_id;
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.price_at_addition = price_at_addition;
    this.discount_at_addition = discount_at_addition;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Method to calculate the total price of the cart item
  calculateTotalPrice(): number {
    return this.quantity * this.price_at_addition * (1 - this.discount_at_addition / 100);
  }

  // Method to update the quantity of the cart item
  updateQuantity(newQuantity: number): void {
    this.quantity = newQuantity;
    this.updated_at = new Date();
  }

  // Method to apply a discount to the cart item
  applyDiscount(discount: number): void {
    this.discount_at_addition = discount;
    this.updated_at = new Date();
  }

  // Method to display the cart item details in dark mode
  displayInDarkMode(): string {
    return `
      <div style="background-color: #333; color: #fff; padding: 10px; border-radius: 5px;">
        <p>Product ID: ${this.product_id}</p>
        <p>Quantity: ${this.quantity}</p>
        <p>Price at Addition: $${this.price_at_addition.toFixed(2)}</p>
        <p>Discount: ${this.discount_at_addition}%</p>
        <p>Total Price: $${this.calculateTotalPrice().toFixed(2)}</p>
      </div>
    `;
  }
}
