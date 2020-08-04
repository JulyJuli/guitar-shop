import { Component, OnInit } from '@angular/core';

import { CartListService } from '../../services/cart-list-service';
import { ProductModel } from 'src/app/products/models/product.model';

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
