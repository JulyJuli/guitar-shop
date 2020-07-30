import { Component, OnInit } from '@angular/core';

import { CartListService } from './services/cart-list-service';
import { Product } from '../product-component/models/product';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list.component.html'
})
export class CartListComponent implements OnInit {
  cartListProducts: Product[];

  constructor(public cartListService: CartListService) { }

  ngOnInit(): void {
    this.cartListProducts = this.cartListService.getExistingProducts();
    this.cartListService.isCartChanged.subscribe(
      () => this.cartListProducts = this.cartListService.getExistingProducts());
  }
}
