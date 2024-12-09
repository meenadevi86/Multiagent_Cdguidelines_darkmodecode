import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { PromotionService } from './promotion.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private promotionService: PromotionService) {}

  // Method to calculate discount for a single product
  calculateProductDiscount(product: Product, quantity: number): number {
    let discount = 0;

    // Check for promotional discounts
    const promoDiscount = this.promotionService.getPromotionDiscount(product);
    if (promoDiscount) {
      discount += promoDiscount;
    }

    // Check for bulk purchase discounts
    if (quantity > 10) {
      discount += 0.1; // 10% discount for bulk purchases
    }

    return discount;
  }

  // Method to apply discount to a cart item
  applyDiscountToCartItem(cartItem: CartItem): CartItem {
    const discount = this.calculateProductDiscount(cartItem.product, cartItem.quantity);
    cartItem.discount = discount;
    cartItem.priceAfterDiscount = cartItem.product.price * (1 - discount);
    return cartItem;
  }

  // Method to calculate total discount for the cart
  calculateTotalDiscount(cartItems: CartItem[]): number {
    return cartItems.reduce((totalDiscount, cartItem) => {
      return totalDiscount + (cartItem.product.price * cartItem.quantity * cartItem.discount);
    }, 0);
  }

  // Method to apply discounts to all items in the cart
  applyDiscountsToCart(cartItems: CartItem[]): CartItem[] {
    return cartItems.map(cartItem => this.applyDiscountToCartItem(cartItem));
  }

  // Method to calculate the total price after discounts
  calculateTotalPriceAfterDiscount(cartItems: CartItem[]): number {
    return cartItems.reduce((totalPrice, cartItem) => {
      return totalPrice + (cartItem.priceAfterDiscount * cartItem.quantity);
    }, 0);
  }
}
