import { Component } from '@angular/core';

import { ProductService } from '../product-component/services/product-service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css'],
  providers: [ProductService]
})
export class ProductListComponentComponent {

  constructor(public productService: ProductService) { }
}
