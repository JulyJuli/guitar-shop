import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Subscription } from 'rxjs';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CartModel } from 'src/app/cart/models/cart.model';
import { CartService } from 'src/app/cart/services/cart-list-service';
import { GeneratorService } from 'src/app/core/services/generator.service';

@Component({
  selector: 'app-order-component',
  templateUrl: './order.component.html',
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class OrderComponent implements OnInit, OnDestroy {

  private currentOrderId: string;
  private maxIdLength = 3;
  private subscription: Subscription;

  cartListProducts: BehaviorSubject<CartModel[]>;

  constructor(
    private localStorage: LocalStorageService,
    public cartListService: CartService,
    public randomGenerator: GeneratorService,
    private router: Router) {
      this.currentOrderId = randomGenerator.generate(this.maxIdLength);
   }

  ngOnInit(): void {
     this.subscription = this.cartListService.getCartProducts().subscribe(
        data => { this.cartListProducts = new BehaviorSubject<CartModel[]>(data); }
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['cart-list']);
  }

  onOrder(): void {
    this.localStorage.setItem(this.currentOrderId, this.cartListProducts.value);
    this.cartListService.removeAllProducts();

    const link = ['/process-order', this.currentOrderId];
    this.router.navigate(link);
  }
}
