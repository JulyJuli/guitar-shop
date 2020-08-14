import { NgModule } from '@angular/core';

import { HighlightDirective } from '../shared/directives/highlight.directive';
import { CommonModule } from '@angular/common';
import { TextSizeChangDirective } from './directives/font-size-change.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    TextSizeChangDirective,
    OrderByPipe
  ],
  declarations: [
    HighlightDirective,
    TextSizeChangDirective,
    OrderByPipe
  ]})
  export class SharedModule { }
