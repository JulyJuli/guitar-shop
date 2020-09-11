import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { OrderComponent } from './components/order-form/order.component';
import { OrderResultComponent } from './components/order-result/order-result.component';

const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order-result/:orderId',
    component: OrderResultComponent
  },
  {
    path: 'order-list',
    canActivate: [AuthGuard],
    component: OrderResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
