import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppSettingsService } from './core/services/app-settings.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router, private addSettings: AppSettingsService) { }

  ngOnInit(): void {
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
