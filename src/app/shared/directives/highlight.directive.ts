import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: '[appHighlight]'
  })
  export class HighlightDirective {

    @HostBinding('style.fontWeight') fontWeight: string;

    @HostBinding('style.color') color: string;

    @HostListener('mouseover')
    onMouseOver() {
        this.color = 'red';
        this.fontWeight = 'bold';
    }

    @HostListener('mouseout')
    onMouseOut() {
        this.color = '#000';
        this.fontWeight = 'normal';
    }
}
