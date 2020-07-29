import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.css']
})
export class ProductComponentComponent implements OnInit {
  @Input() productName: string;

  ngOnInit(): void {
  }

  public onBuy(): void {
    console.log(`OnBuy was clicked for ${this.productName}`);
  }
}
