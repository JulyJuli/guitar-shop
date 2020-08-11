import { NgModule } from '@angular/core';

import { HighlightDirective } from '../shared/directives/highlight.directive';
import { CommonModule } from '@angular/common';
import { TextSizeChangDirective } from './directives/font-size-change.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective,
    TextSizeChangDirective
  ],
  declarations: [
    HighlightDirective,
    TextSizeChangDirective
  ]})
  export class SharedModule { }
