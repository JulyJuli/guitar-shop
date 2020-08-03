import { Component, Input } from '@angular/core';

import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  @Input() productId: number;

  constructor(public productService: ProductService) {
  }

  public onBuy(): void {
    const product = this.productService.getProductById(this.productId);
    console.log(`OnBuy was clicked for ${product.name}`);

    this.productService.addProductToCart(product);
  }
}
