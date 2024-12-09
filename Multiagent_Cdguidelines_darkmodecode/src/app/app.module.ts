import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartService } from './services/cart.service';
import { DiscountService } from './services/discount.service';
import { OrderService } from './services/order.service';

import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { DiscountCodeComponent } from './components/discount-code/discount-code.component';
import { CheckoutButtonComponent } from './components/checkout-button/checkout-button.component';

import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DarkModeToggleComponent } from './shared/dark-mode-toggle/dark-mode-toggle.component';
import { PriceDisplayComponent } from './shared/price-display/price-display.component';
import { QuantitySelectorComponent } from './shared/quantity-selector/quantity-selector.component';
import { DiscountDisplayComponent } from './shared/discount-display/discount-display.component';
import { CheckoutSummaryComponent } from './shared/checkout-summary/checkout-summary.component';
import { CartIconComponent } from './shared/cart-icon/cart-icon.component';
import { ProductListComponent } from './shared/product-list/product-list.component';
import { ProductItemComponent } from './shared/product-item/product-item.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { SuccessMessageComponent } from './shared/success-message/success-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    CartItemComponent,
    DiscountCodeComponent,
    CheckoutButtonComponent,
    CartPageComponent,
    CheckoutPageComponent,
    ProductPageComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    DarkModeToggleComponent,
    PriceDisplayComponent,
    QuantitySelectorComponent,
    DiscountDisplayComponent,
    CheckoutSummaryComponent,
    CartIconComponent,
    ProductListComponent,
    ProductItemComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    SuccessMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    AppRoutingModule
  ],
  providers: [
    CartService,
    DiscountService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
