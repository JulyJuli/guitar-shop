import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


import { ProductModel } from 'src/app/products/models/product.model';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() sourceProduct: ProductModel;
  @Output() boughtProduct = new EventEmitter<ProductModel>();
  @Output() viewedProduct = new EventEmitter<ProductModel>();

  constructor(private router: Router, private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 500);
 }

  onBuy(popover: PopoverDirective): void {
    if (this.sourceProduct.isAvailable) {
      console.log(`OnBuy was clicked for ${this.sourceProduct.name}`);
      this.boughtProduct.emit(this.sourceProduct);
      setInterval(() => { popover.hide(); }, 1000);
    }
  }

  onView(): void {
    if (this.sourceProduct.isAvailable) {
      console.log(`OnView was clicked for ${this.sourceProduct.name}`);
      this.viewedProduct.emit(this.sourceProduct);
    }
  }

  onEdit(): void {
    const link = ['/edit', this.sourceProduct.id];
    this.router.navigate(link);
  }
}
