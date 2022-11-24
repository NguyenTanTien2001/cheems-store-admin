import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(val => this.navigationInterceptor(val as RouterEvent));

    if (typeof (document as any).documentMode === 'number' && (document as any).documentMode < 11) {
      const style = document.createElement('style');
      style.textContent = `
        * {
          -ms-animation: none !important;
          animation: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`;
      document.head.appendChild(style);
    }
  }
  title = 'cheems-store-admin';
  private navigationInterceptor(e: RouterEvent): void {
    if (e instanceof NavigationStart) {
      // Set loading state
      document.body.classList.add('app-loading');
    }

    if (e instanceof NavigationEnd) {
    }

    if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) {
      // Remove loading state
      document.body.classList.remove('app-loading');
    }
  }
  ngOnInit(): void {
    // 2
    this.authService.autoLogin();
  }

}
