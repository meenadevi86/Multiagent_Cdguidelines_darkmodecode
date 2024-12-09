import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css']
})
export class CartIconComponent implements OnInit {
  cartItemCount: number = 0;
  isDarkMode: boolean = false;

  constructor(
    private cartService: CartService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItemCount();
    this.subscribeToThemeChanges();
  }

  loadCartItemCount(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = items.length;
    });
  }

  subscribeToThemeChanges(): void {
    this.themeService.isDarkMode().subscribe(isDark => {
      this.isDarkMode = isDark;
      this.applyDarkModeStyles();
    });
  }

  applyDarkModeStyles(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }
}
