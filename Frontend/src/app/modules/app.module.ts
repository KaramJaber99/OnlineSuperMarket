import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutComponent } from '../components/layout/layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeRoutingModule } from './home-routing.module';
import { CustomerComponent } from '../components/customer/customer.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProductComponent } from '../components/product/product.component';
import { AdminComponent } from '../components/admin/admin.component';
import { ManageProductsComponent } from '../components/admin/manage-products/manage-products.component';
import { IsHighlightedPipe } from '../pipes/is-highlighted.pipe';
import { CartComponent } from '../components/customer/cart/cart.component';
import { CheckoutComponent } from '../components/customer/checkout/checkout.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    CustomerComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    AdminComponent,
    ManageProductsComponent,
    IsHighlightedPipe
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    HomeRoutingModule,
    RouterModule, RoutingModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
  ],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
