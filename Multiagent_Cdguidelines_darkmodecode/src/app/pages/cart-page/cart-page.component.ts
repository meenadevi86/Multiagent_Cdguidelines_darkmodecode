import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  darkMode: boolean = true;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.price_at_addition * item.quantity), 0);
  }

  addItem(productId: number): void {
    const product = this.productService.getProductById(productId);
    if (product) {
      this.cartService.addItemToCart(product);
      this.loadCartItems();
      this.calculateTotalPrice();
    }
  }

  removeItem(cartItemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItemFromCart(cartItemId);
      this.loadCartItems();
      this.calculateTotalPrice();
    }
  }

  updateItemQuantity(cartItemId: number, quantity: number): void {
    this.cartService.updateItemQuantity(cartItemId, quantity);
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
