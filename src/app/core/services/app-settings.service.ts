import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private settingsKey = 'userInfo';
  private url = 'http://localhost:4200/assets/app-settings.json';
  private defaultSettings = {
    userInfo: {
      login: 'default',
      password: 'default'
    }
  };

  constructor(private http: HttpClient, private storage: LocalStorageService) { }

  loadAppSettings(): void {
    const settings = this.storage.getItem(this.settingsKey);

    if (!settings) {
      this.http.get(this.url).pipe(
        retry(2),
        catchError((err: HttpErrorResponse) => {
          this.storage.setItem(this.settingsKey, this.defaultSettings);
          return throwError('Settings from app-settings.json file were not set. Default used.'); })
      ).subscribe(data => this.storage.setItem(this.settingsKey, data));
    }
  }
}
