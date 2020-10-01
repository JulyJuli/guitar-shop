import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettingsService } from './core/services/app-settings.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    private addSettings: AppSettingsService) {
    this.addSettings.loadAppSettings();
  }

  onLogin(): void {
      this.authService.login();
  }

  onLogout(): void {
      this.authService.logout();
      this.router.navigate(['product-list']);
  }
}
