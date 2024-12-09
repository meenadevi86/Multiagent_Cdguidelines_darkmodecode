import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-checkout-summary',
  templateUrl: './checkout-summary.component.html',
  styleUrls: ['./checkout-summary.component.css']
})
export class CheckoutSummaryComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalDiscount: number = 0;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.price_at_addition * item.quantity), 0);
    this.totalDiscount = this.cartItems.reduce((acc, item) => acc + (item.discount_at_addition * item.quantity), 0);
  }

  removeItem(cartItemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeCartItem(cartItemId).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(cartItemId);
    } else {
      this.cartService.updateCartItemQuantity(cartItemId, quantity).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  addItem(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: Product) => {
      const cartItem: CartItem = {
        cart_item_id: 0,
        cart_id: 0,
        product_id: product.product_id,
        quantity: 1,
        price_at_addition: product.price,
        discount_at_addition: product.discount,
        created_at: new Date(),
        updated_at: new Date()
      };
      this.cartService.addCartItem(cartItem).subscribe(() => {
        this.loadCartItems();
      });
    });
  }
}
