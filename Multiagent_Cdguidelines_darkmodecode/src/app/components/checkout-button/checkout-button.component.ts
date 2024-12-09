import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-checkout-button',
  templateUrl: './checkout-button.component.html',
  styleUrls: ['./checkout-button.component.css']
})
export class CheckoutButtonComponent implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;
  isDarkMode: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.themeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
      this.applyDarkModeStyles();
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => {
      return total + (item.price_at_addition - item.discount_at_addition) * item.quantity;
    }, 0);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }

  applyDarkModeStyles(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
