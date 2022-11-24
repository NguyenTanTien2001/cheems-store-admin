import { Inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { TuiAlertService, TuiNotification } from "@taiga-ui/core";
import { Observable, of, take } from "rxjs";
import { map, tap } from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private authService: AuthService,
    private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let a$ =  this.authService.isAuthenticated.pipe(
      take(1),
      tap(allowed => {
        if(!allowed) {
          this.alertService.open('', {
            label: 'Must login!',
            status: TuiNotification.Warning,
            autoClose: true,
          })
        }
        else {

        }
      })
    );

    let result$ = false;

    let b$ = a$.subscribe((result) => {
        if(!result) {
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
          this.router.navigate(['/login']);
          result$ = false;
        }
        else {
          result$ = true;
        }
    })

    return of(result$);
  }
}
