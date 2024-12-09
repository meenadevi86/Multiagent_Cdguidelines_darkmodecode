import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CartItem } from '../../models/cart-item.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-discount-display',
  templateUrl: './discount-display.component.html',
  styleUrls: ['./discount-display.component.css']
})
export class DiscountDisplayComponent implements OnInit {
  @Input() cartItems: CartItem[] = [];
  products: Product[] = [];
  totalDiscount: number = 0;

  constructor(private cartService: CartService, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.calculateTotalDiscount();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.calculateTotalDiscount();
    });
  }

  private calculateTotalDiscount(): void {
    this.totalDiscount = this.cartItems.reduce((acc, item) => {
      const product = this.products.find(p => p.product_id === item.product_id);
      if (product) {
        acc += (product.price * (product.discount / 100)) * item.quantity;
      }
      return acc;
    }, 0);
  }

  removeItem(cartItemId: number): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItem(cartItemId).subscribe(() => {
        this.cartItems = this.cartItems.filter(item => item.cart_item_id !== cartItemId);
        this.calculateTotalDiscount();
      });
    }
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    this.cartService.updateQuantity(cartItemId, quantity).subscribe(() => {
      const item = this.cartItems.find(item => item.cart_item_id === cartItemId);
      if (item) {
        item.quantity = quantity;
        this.calculateTotalDiscount();
      }
    });
  }
}
