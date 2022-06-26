import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isNavbarCollapsed = false;
  isAuth = false;
  authSubscribtion: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSubscribtion = this.authService.user.subscribe((userData) => {
      this.isAuth = userData ? true : false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscribtion.unsubscribe();
  }
}
