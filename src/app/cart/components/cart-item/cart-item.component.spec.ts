import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CartItemComponent } from './cart-item.component';
import { CartModel } from '../../models/cart.model';

describe('HeaderComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let nameEl: DebugElement;
  let removeButton: DebugElement;

  const cartItem = {
      id: 1,
      name: 'Product in cart name',
      price: 1200,
      numberOfProducts: 1
    } as CartModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartItemComponent]
    });

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
  });

  it('should display product name', () => {
    component.item = cartItem;

    fixture.detectChanges();
    nameEl = fixture.debugElement.query(By.css('.cart-item-name'));
    expect(nameEl.nativeElement.textContent).toContain(component.item.name);
  });

  it('should raise remove event when remove button clicked', () => {

    let itemToRemove = null;
    component.item = cartItem;
    fixture.detectChanges();

    component.deletedItem.subscribe((item) => (itemToRemove = item));

    removeButton = fixture.debugElement.query(By.css('.delete-button'));
    removeButton.triggerEventHandler('click', null);
    expect(cartItem).toBe(itemToRemove);
  });
});
