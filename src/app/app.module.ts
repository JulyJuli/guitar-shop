import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/components/first/first.component';
import { ProductRepository } from './shared/repositories/product-repository';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './products/product.module';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './layout/components/about.component';
import { OrderModule } from './orders/order.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CartModule,
    ProductModule,
    SharedModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [
    ProductRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
