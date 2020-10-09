import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from './products.effects';
import { productsReducer } from './products.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('products', productsReducer),
    // вот тут была ошибка, у вас не срабатывал эффект и не доставал продукты,
    // вы использовали не forFeature, а forRoot
    EffectsModule.forFeature([ProductsEffects]),
  ],
})
export class ProductsStoreModule {}
