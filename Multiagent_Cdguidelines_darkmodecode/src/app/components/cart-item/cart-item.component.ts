import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() cartItem: CartItem;
  @Output() itemRemoved: EventEmitter<number> = new EventEmitter<number>();
  @Output() itemUpdated: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor(private cartService: CartService) {}

  removeItem() {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeItem(this.cartItem.id).subscribe(() => {
        this.itemRemoved.emit(this.cartItem.id);
      });
    }
  }

  updateQuantity(newQuantity: number) {
    if (newQuantity > 0) {
      this.cartItem.quantity = newQuantity;
      this.cartService.updateItem(this.cartItem).subscribe(() => {
        this.itemUpdated.emit(this.cartItem);
      });
    }
  }

  getTotalPrice(): number {
    return this.cartItem.quantity * this.cartItem.priceAtAddition;
  }
}
