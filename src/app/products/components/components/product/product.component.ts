import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/products/services/product-service';
import { ProductModel } from 'src/app/products/models/product.model';


@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  @Input() productId: number;
  @Output() product = new EventEmitter<ProductModel>();

  constructor(private productService: ProductService) { }

  onBuy(): void {
    const product = this.productService.getProductById(this.productId);
    console.log(`OnBuy was clicked for ${product.name}`);

    this.product.emit(product);
  }
}
