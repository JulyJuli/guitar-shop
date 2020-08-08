import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('firstComponentTitle') firstComponentTitle: ElementRef;

  title = 'shop';

  ngAfterViewInit(): void {
   // this.firstComponentTitle.nativeElement.text = 'Hi from the first component!';
  }
}
