import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed = false;
  isAuth = false;
  language: string;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((userData) => (this.isAuth = !!userData));

    this.language = localStorage.getItem('lang') || 'en';
  }

  onLogout() {
    this.authService.logout();
  }

  onLangChange(event: Event) {
    const target = event.target as HTMLInputElement;

    localStorage.setItem('lang', target.value);

    this.translateService.use(target.value);
  }
}
