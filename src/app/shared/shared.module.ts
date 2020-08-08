import { NgModule } from '@angular/core';

import { HighlightDirective } from '../shared/directives/highlight.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    HighlightDirective
  ],
  declarations: [
    HighlightDirective
  ]})
  export class SharedModule { }
