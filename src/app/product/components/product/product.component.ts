import { Component, Input } from '@angular/core';

import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product.component.html'
})
export class ProductComponent {
  @Input() productId: number;

  // если сервис не используется в шаблоне, делаем его приватным
  // этот компонент получил данные, он не является их владельцем и не должен их менять
  // это значит, что тут не должно быть зависимости, только аутпут,
  // а уже родитель, у которого и так есть зависимость на сервис, будет выполнять "покупку".
  constructor(private productService: ProductService) {
  }

  // модификатор public не ставим для методов
  onBuy(): void {
    const product = this.productService.getProductById(this.productId);
    console.log(`OnBuy was clicked for ${product.name}`);

    this.productService.addProductToCart(product);
  }
}
