import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighlightDirective } from '../shared/directives/highlight.directive';
import { TextSizeChangDirective } from './directives/font-size-change.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MapToArray } from './pipes/map-to-array.pipe';
import { EmailContentValidatorDirective } from './directives/email-content-validator.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    EmailContentValidatorDirective,
    TextSizeChangDirective,
    OrderByPipe,
    MapToArray,
    CommonModule
  ],
  declarations: [
    HighlightDirective,
    EmailContentValidatorDirective,
    TextSizeChangDirective,
    OrderByPipe,
    MapToArray
  ]})
  export class SharedModule { }
