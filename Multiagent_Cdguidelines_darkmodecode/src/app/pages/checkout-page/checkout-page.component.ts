import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  darkMode: boolean = true;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price_at_addition - item.discount_at_addition) * item.quantity;
    }, 0);
  }

  addItem(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: Product) => {
      this.cartService.addItemToCart(product);
      this.loadCartItems();
      this.calculateTotalPrice();
    });
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

  proceedToPayment(): void {
    this.router.navigate(['/payment']);
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark-mode', this.darkMode);
  }
}
