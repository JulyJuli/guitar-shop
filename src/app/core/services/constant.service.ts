import { Injectable } from '@angular/core';

@Injectable()
export class ConstantService {
  private data = { AppName: 'TaskManager', Version: '1.0', Url: 'https://localhost:4200' };

  constructor() {}

  getData(): {} {
    return this.data;
  }
}