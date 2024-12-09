import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartItems: CartItem[] = [];
  darkMode: boolean = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCartItems();
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.darkMode = isDarkMode;
      this.applyDarkMode();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product).subscribe((cartItem) => {
      this.cartItems.push(cartItem);
    });
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== cartItem.id);
    });
  }

  updateCartItem(cartItem: CartItem, quantity: number): void {
    this.cartService.updateCartItem(cartItem, quantity).subscribe((updatedItem) => {
      const index = this.cartItems.findIndex(item => item.id === updatedItem.id);
      if (index !== -1) {
        this.cartItems[index] = updatedItem;
      }
    });
  }

  applyDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
