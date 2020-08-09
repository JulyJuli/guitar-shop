import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FirstComponent } from './first/components/first/first.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle') appComponentTitle: ElementRef;

  title = 'shop';

  ngAfterViewInit(): void {
    this.appComponentTitle.nativeElement.textContent = 'Guitar shop!';
  }
}
