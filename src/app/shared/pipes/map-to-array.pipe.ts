import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArray implements PipeTransform {
  transform(value): any {
    if (value) {
      const arr = [];
      for (const key of Object.keys(value)) {
        arr.push({ key, value: value[key]});
      }
      return arr;
    }
  }
}
