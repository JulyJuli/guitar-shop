import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/components/first/first.component';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './products/product.module';
import { SharedModule } from './shared/shared.module';
import { AboutComponent } from './layout/components/about.component';
import { OrderModule } from './orders/order.module';
import { httpInterceptorProviders } from './core/interceptors';
import { TimingInterceptor } from './core/interceptors/timing.interceptor';

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
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
