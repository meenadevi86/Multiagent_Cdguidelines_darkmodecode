import { Component, OnInit, HostBinding } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.dark-mode') darkMode: boolean = false;
  cartItemCount: number = 0;

  constructor(
    private themeService: ThemeService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.themeService.darkMode$.subscribe((isDarkMode) => {
      this.darkMode = isDarkMode;
    });

    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.length;
    });
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
