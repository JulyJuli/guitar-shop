import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from '../shared/directives/highlight.directive';
import { TextSizeChangDirective } from './directives/font-size-change.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MapToArray } from './pipes/map-to-array.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    TextSizeChangDirective,
    OrderByPipe,
    MapToArray,
    CommonModule
  ],
  declarations: [
    HighlightDirective,
    TextSizeChangDirective,
    OrderByPipe,
    MapToArray
  ]})
  export class SharedModule { }
