import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/theme.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  darkMode: boolean = false;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.darkMode = isDarkMode;
      this.applyDarkMode();
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price_at_addition - item.discount_at_addition) * item.quantity;
    }, 0);
  }

  addItem(productId: number): void {
    this.productService.getProductById(productId).subscribe((product: Product) => {
      this.cartService.addItemToCart(product).subscribe(() => {
        this.loadCartItems();
      });
    });
  }

  removeItem(cartItemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItemFromCart(cartItemId).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  updateItemQuantity(cartItemId: number, quantity: number): void {
    this.cartService.updateCartItemQuantity(cartItemId, quantity).subscribe(() => {
      this.loadCartItems();
    });
  }

  applyDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  proceedToCheckout(): void {
    // Logic to proceed to checkout
  }

  continueShopping(): void {
    // Logic to continue shopping
  }
}
