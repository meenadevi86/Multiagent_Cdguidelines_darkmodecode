import { Component, OnInit, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.css']
})
export class PriceDisplayComponent implements OnInit {
  @Input() cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalDiscount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = 0;
    this.totalDiscount = 0;
    this.cartItems.forEach(item => {
      this.totalPrice += item.price_at_addition * item.quantity;
      this.totalDiscount += item.discount_at_addition * item.quantity;
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(item);
      return;
    }
    item.quantity = quantity;
    this.cartService.updateCartItem(item).subscribe(() => {
      this.calculateTotal();
    });
  }

  removeItem(item: CartItem): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeCartItem(item.cart_item_id).subscribe(() => {
        this.cartItems = this.cartItems.filter(ci => ci.cart_item_id !== item.cart_item_id);
        this.calculateTotal();
      });
    }
  }

  proceedToCheckout(): void {
    // Logic to proceed to checkout
  }

  continueShopping(): void {
    // Logic to continue shopping
  }
}
