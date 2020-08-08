import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/components/first/first.component';
import { ProductComponent } from './products/components/components/product/product.component';
import { ProductListComponent } from './products/components/components/product-list/product-list.component';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';
import { ProductService } from './products/services/product-service';
import { CartListService } from './cart/services/cart-list-service';
import { CartItemComponent } from './cart/components/cart-item/cart-item.component';
import { HighlightDirective } from './shared/directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    ProductComponent,
    CartItemComponent,
    ProductListComponent,
    CartListComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  exports: [
    HighlightDirective
  ],
  providers: [
    ProductService,
    CartListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
