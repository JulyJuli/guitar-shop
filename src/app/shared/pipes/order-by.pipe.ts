import { Pipe, PipeTransform } from '@angular/core';

import { ProductModel } from 'src/app/products/models/product.model';

@Pipe({
  name: 'orderby'
})
export class OrderByPipe implements PipeTransform {
  transform(products: ProductModel[], ...args: any[]): ProductModel[] {
    const propertyName = args[0];
    const isDesc = args.length > 1 ? args[1] : true;
    const sortedCollection = products.sort((a, b) => {
      return a[propertyName] < b[propertyName]
        ? -1
        : a[propertyName] > b[propertyName]
          ? 1 : 0;
    });

    return isDesc ? sortedCollection : sortedCollection.reverse();
  }
}
