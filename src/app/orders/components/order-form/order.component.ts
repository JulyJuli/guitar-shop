import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

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
export class OrderComponent implements OnInit {

  private currentOrderId: string;
  private maxIdLength = 3;
  cartListProducts: BehaviorSubject<CartModel[]>;

  constructor(
    private localStorage: LocalStorageService,
    public cartListService: CartService,
    public randomGenerator: GeneratorService,
    private router: Router) {
      this.currentOrderId = randomGenerator.generate(this.maxIdLength);
   }

  ngOnInit(): void {
      this.cartListService.cartProducts.subscribe(
        data => { this.cartListProducts = new BehaviorSubject<CartModel[]>(data); }
      );
  }

  onBack(): void {
    this.router.navigate(['cart-list']);
  }

  onOrder(): void {
    this.localStorage.setItem(this.currentOrderId, this.cartListProducts.value);
    this.cartListService.removeAllProducts();

    const link = ['/order-result', this.currentOrderId];
    this.router.navigate(link);
  }
}
