import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product-service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit, OnDestroy {
  productList: Observable<ProductModel[]>;
  currentProductList: ProductModel[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.productService.isProductListChanged.subscribe(
      () => this.productList = this.productService.getProducts());
    this.productList.subscribe((products: ProductModel[]) => this.currentProductList = products);
  }

  ngOnDestroy(): void {
    this.productService.isProductListChanged.unsubscribe();
  }

  onBuyProduct(product: ProductModel): void {
    this.productService.addProductToCart(product, 1);
  }
}
