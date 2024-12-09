import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { ProductService } from './services/product.service';
import { ThemeService } from './services/theme.service';
import { CartItem } from './models/cart-item.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Shopping Cart';
  cartItems: CartItem[] = [];
  products: Product[] = [];
  isDarkMode: boolean = false;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadProducts();
    this.themeService.isDarkMode().subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.applyTheme();
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItemToCart(product).subscribe((item) => {
      this.cartItems.push(item);
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeItemFromCart(cartItem.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== cartItem.id);
    });
  }

  updateCartItem(cartItem: CartItem): void {
    this.cartService.updateCartItem(cartItem).subscribe((updatedItem) => {
      const index = this.cartItems.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.cartItems[index] = updatedItem;
      }
    });
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
