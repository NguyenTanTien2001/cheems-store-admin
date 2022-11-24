import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideNavForMe: EventEmitter<any> = new EventEmitter();

  public logged = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isAuthenticated.pipe(
      distinctUntilChanged() // Only emit when the current value is different than the last
    ).subscribe(isAuthenticated => {
        this.logged = isAuthenticated
      });
  }

  toggleSideNav() {
    this.toggleSideNavForMe.emit();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
