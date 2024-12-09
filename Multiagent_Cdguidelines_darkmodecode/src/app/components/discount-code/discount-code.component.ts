import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { DiscountService } from '../../services/discount.service';

@Component({
  selector: 'app-discount-code',
  templateUrl: './discount-code.component.html',
  styleUrls: ['./discount-code.component.css']
})
export class DiscountCodeComponent implements OnInit {
  discountForm: FormGroup;
  discountMessage: string;
  isDarkMode: boolean;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private discountService: DiscountService
  ) {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  ngOnInit(): void {
    this.discountForm = this.fb.group({
      code: ['', Validators.required]
    });

    this.applyDarkMode();
  }

  applyDiscount(): void {
    if (this.discountForm.valid) {
      const code = this.discountForm.get('code').value;
      this.discountService.validateDiscountCode(code).subscribe(
        (response) => {
          if (response.valid) {
            this.cartService.applyDiscount(code).subscribe(
              () => {
                this.discountMessage = 'Discount applied successfully!';
                this.updateCartTotal();
              },
              (error) => {
                this.discountMessage = 'Failed to apply discount. Please try again.';
              }
            );
          } else {
            this.discountMessage = 'Invalid discount code.';
          }
        },
        (error) => {
          this.discountMessage = 'Error validating discount code. Please try again.';
        }
      );
    }
  }

  removeDiscount(): void {
    this.cartService.removeDiscount().subscribe(
      () => {
        this.discountMessage = 'Discount removed successfully!';
        this.updateCartTotal();
      },
      (error) => {
        this.discountMessage = 'Failed to remove discount. Please try again.';
      }
    );
  }

  updateCartTotal(): void {
    this.cartService.updateCartTotal().subscribe(
      (total) => {
        // Update the cart total in the UI
      },
      (error) => {
        this.discountMessage = 'Error updating cart total. Please try again.';
      }
    );
  }

  applyDarkMode(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
