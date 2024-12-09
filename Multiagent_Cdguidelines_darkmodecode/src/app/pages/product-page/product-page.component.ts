import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product: Product;
  cartItems: CartItem[] = [];
  darkMode: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadCartItems();
    this.applyDarkMode();
  }

  loadProduct(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe((product: Product) => {
      this.product = product;
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItemToCart(product).subscribe((item: CartItem) => {
      this.cartItems.push(item);
    });
  }

  removeFromCart(item: CartItem): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItemFromCart(item).subscribe(() => {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      });
    }
  }

  updateCartItemQuantity(item: CartItem, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateCartItemQuantity(item, quantity).subscribe((updatedItem: CartItem) => {
        const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (index !== -1) {
          this.cartItems[index] = updatedItem;
        }
      });
    }
  }

  applyDarkMode(): void {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    this.applyDarkMode();
  }
}
