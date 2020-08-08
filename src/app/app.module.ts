import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/components/first/first.component';
import { HighlightDirective } from './shared/directives/highlight.directive';
import { ProductRepository } from './shared/repositories/product-repository';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './products/product.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
    ProductModule,
    CommonModule,
    SharedModule
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
