import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductModel } from 'src/app/products/models/product.model';
import { OrderValidationService } from '../../services/order-validation.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html'
})
export class ProcessOrderComponent implements OnInit, OnDestroy {
  private emailValidationPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+';
  private currentOrderId: string;
  private subscription: Subscription;

  validationMessage = '';
  currentOrder: ProductModel[];

  orderForm: FormGroup;
  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  constructor(
    public orderValidationService: OrderValidationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
      this.subscription = this.activatedRouter.params.subscribe(params => {
        const propertyName = 'orderId';
        this.currentOrderId = params[propertyName];
     });
    }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddPhone(): void {
    this.phones.push(this.buildPhone());
  }

  onRemovePhone(): void {
    if (this.phones.length > 1) {
      this.phones.removeAt(this.phones.length - 1);
    }
  }

  onBlur() {
    const controlName = 'email';
    this.validationMessage = this.orderValidationService.setEmailValidationMessage(this.orderForm.get(controlName), controlName);
  }

  onCheckOut(): void {
    const link = ['/order-result', this.currentOrderId];
    this.router.navigate(link);
  }

  private buildForm() {
    this.orderForm = this.formBuilder.group({
      firstName: this.formBuilder.control('', { validators: [
        Validators.required, Validators.minLength(3), this.orderValidationService.nameValidator], updateOn: 'blur' }),
      lastName: this.formBuilder.control(''),
      email: [
        '',
        [Validators.required, Validators.pattern(this.emailValidationPattern), Validators.email]
      ],
      phones: this.formBuilder.array([this.buildPhone()]),
      needDelivery: false,
      address: this.formBuilder.control(''),
    });
  }

  private buildPhone(): FormGroup {
    return this.formBuilder.group({
      phone: this.formBuilder.control('', { validators: [Validators.required, Validators.pattern(new RegExp('[0-9 ]{12}'))] })
    });
  }
}
