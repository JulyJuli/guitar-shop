import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product-component/product.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FirstComponent } from './first/first.component';
import { ProductService } from './product-component/services/product-service';
import { CartListService } from './cart-list/services/cart-list-service';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ProductComponent,
    ProductListComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ProductService,
    CartListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
