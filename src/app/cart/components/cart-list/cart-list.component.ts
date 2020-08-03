import { Component, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/product/models/product.model';
import { CartListService } from '../../services/cart-list-service';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list.component.html'
})
export class CartListComponent implements OnInit {
  cartListProducts: ProductModel[];

  constructor(public cartListService: CartListService) { }

  ngOnInit(): void {
    this.cartListProducts = this.cartListService.getExistingProducts();
    this.cartListService.isCartChanged.subscribe(
      () => this.cartListProducts = this.cartListService.getExistingProducts());
  }
}
