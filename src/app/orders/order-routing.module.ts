import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order-form/order.component';
import { OrderListComponent } from './components/order-list/order-list.component';


const routes: Routes = [
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'order-list/:orderId',
    component: OrderListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
