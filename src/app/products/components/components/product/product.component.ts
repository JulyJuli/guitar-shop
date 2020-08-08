import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html',
  styles: ['./product.component.css']
})
export class ProductComponent implements OnDestroy {
  @Input() sourceProduct: ProductModel;
  @Output() boughtProduct = new EventEmitter<ProductModel>();

  ngOnDestroy(): void {
    this.boughtProduct.unsubscribe();
  }

  onBuy(): void {
    if (this.sourceProduct.isAvailable) {
      console.log(`OnBuy was clicked for ${this.sourceProduct.name}`);
      this.boughtProduct.emit(this.sourceProduct);
    }
  }
}
