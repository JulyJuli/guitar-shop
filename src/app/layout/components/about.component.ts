import { Component, Optional, OnInit, Inject } from '@angular/core';

import { ConfigOptionsService } from 'src/app/core/services/config-options.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { GeneratorService } from 'src/app/core/services/generator.service';
import { ConstantService } from 'src/app/core/services/constant.service';
import { GeneratorFactory, GeneratorServiceAlias } from 'src/app/core/factories/generator.factory';

const constant = new ConstantService();
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService },
    ConfigOptionsService,
    { provide: ConstantService, useValue: constant },
    { provide: GeneratorServiceAlias, useFactory: GeneratorFactory(40), deps: [GeneratorService] }
  ]
})
export class AboutComponent implements OnInit {
  private test = 'TEST';

  constructor(
    @Optional() private localStorageService: LocalStorageService,
    @Optional() private configOptionsService: ConfigOptionsService,
    @Optional() private constantService: ConstantService,
    @Inject(GeneratorServiceAlias) private generationResult: string) { }

  ngOnInit() {
    console.log('Demonstrate local storage:');
    this.getLocalStorageExample();

    console.log('Demonstrate config option service:');
    this.getConfigOptionsServiceExample();

    console.log('Demonstrate constant service: Name: ' + this.constantService.data.AppName +
    '; Url:' + this.constantService.data.Url +
    '; Version: ' + this.constantService.data.Version);

    console.log('Demonstrate generated sequence: ' + this.generationResult);
  }

  getLocalStorageExample(): void {
    this.localStorageService.setItem('key', this.test);
    const lsValue = this.localStorageService.getItem('key');
    console.log(lsValue);
    this.localStorageService.removeItem('key');
  }

  getConfigOptionsServiceExample(): void {
    this.configOptionsService.setConfig({ login: 'admin', id: 1, email: 'admin' });
    const login = this.configOptionsService.getConfig('login');
    console.log(login);
  }
}
