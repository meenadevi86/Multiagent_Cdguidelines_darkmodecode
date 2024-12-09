import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() updateCart = new EventEmitter<void>();

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addProductToCart(this.product).subscribe(() => {
      this.updateCart.emit();
    });
  }

  removeFromCart() {
    this.cartService.removeProductFromCart(this.product.id).subscribe(() => {
      this.updateCart.emit();
    });
  }

  updateQuantity(quantity: number) {
    this.cartService.updateProductQuantity(this.product.id, quantity).subscribe(() => {
      this.updateCart.emit();
    });
  }

  getDiscountedPrice(): number {
    return this.product.price - (this.product.price * this.product.discount / 100);
  }
}
