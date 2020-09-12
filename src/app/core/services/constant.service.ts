import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  data = { AppName: 'GuitarShop', Version: '1.0', Url: 'https://localhost:4200' };
}
