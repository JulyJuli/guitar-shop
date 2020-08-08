import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/components/first/first.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { ProductRepository } from './shared/repositories/product-repository';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './products/product.module';
import { ProductListComponent } from './products/components/components/product-list/product-list.component';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
    ProductModule
  ],
  exports: [
    HighlightDirective
  ],
  providers: [
    ProductRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
