import { Directive, HostListener, ElementRef, Renderer2, Input  } from '@angular/core';

@Directive({
  selector: '[appFontSizeChange]'
})
export class TextSizeChangDirective {
  @Input() fontSize = '20px';

  constructor(private elementRef: ElementRef, private render: Renderer2) { }

  @HostListener('click')
  onClick() {
    this.render.setStyle(this.elementRef.nativeElement, 'fontSize', this.fontSize);
  }
}
