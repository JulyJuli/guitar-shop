import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AppSettingsService } from './core/services/app-settings.service';
import { AuthService } from './core/services/auth.service';
import { LocalStorageService } from './core/services/local-storage.service';

let fixture: ComponentFixture<AppComponent>;

describe('AppComponent (Shallow)', () => {
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, AppSettingsService, LocalStorageService],
      schemas: [NO_ERRORS_SCHEMA]
    });

    mockHttp = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttp.verify();
  });
  
  it('should load settings on start', () => {
    const settingsService = TestBed.inject(AppSettingsService);
    const spy = spyOn(settingsService, 'loadAppSettings');
    fixture = TestBed.createComponent(AppComponent);
    expect(spy.calls.count()).toBe(1, 'loadAppSettings was called once');
  });
});
