import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductService } from 'src/app/products/services/product-service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.productService.isProductListChanged.subscribe(
      () => this.productList = this.productService.getProducts());
  }

  onBuyProduct(product: ProductModel): void {
    this.productService.addProductToCart(product);
  }
}
