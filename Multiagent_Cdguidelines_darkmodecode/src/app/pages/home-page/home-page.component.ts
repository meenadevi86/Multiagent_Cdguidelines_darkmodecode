import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/theme.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  cartItems: CartItem[] = [];
  products: Product[] = [];
  darkMode: boolean = false;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.loadProducts();
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.darkMode = isDarkMode;
      this.applyDarkMode();
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
    this.cartService.addItemToCart(product).subscribe((updatedCart) => {
      this.cartItems = updatedCart;
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeItemFromCart(cartItem).subscribe((updatedCart) => {
      this.cartItems = updatedCart;
    });
  }

  updateCartItem(cartItem: CartItem, quantity: number): void {
    this.cartService.updateCartItem(cartItem, quantity).subscribe((updatedCart) => {
      this.cartItems = updatedCart;
    });
  }

  applyDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
}
