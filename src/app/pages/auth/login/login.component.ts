import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { of, throwError } from 'rxjs';
import { catchError, map, switchMap, take, takeLast, tap, timeout } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GC_AUTH_TOKEN, GC_USER_ID } from 'src/assets/constants/constants';
import { LoginValidation } from './login.validation';
import { LoginFormControl } from './_form-controls/login-form-control';
import { SignInUserMutationResponse, SIGNIN_USER_QUERRY } from './_graphql/sign-in-user.graphql';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading: boolean = false;

  public appForm!: FormGroup;
  public validation!: LoginValidation;

  formBody(): FormArray {
    return this.appForm.get('formBody') as FormArray;
  }

  constructor(
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private router: Router,
    public _authService: AuthService,
    private apollo: Apollo,
    public _formBuilder: FormBuilder,
    private location: Location) {
    this.appForm = new FormGroup({});
  }

  ngOnInit() {
    if(this._authService.isAuthenticated) {
      this.location.back();
    }
    /**
    *  Prepare the result gotten from the subscribe and scaffold it
    *  into form controls.
    */
    var formBodyControls = this.prepareFormBodyControls();
    /**
     *  Create the body group and input my previously scaffolded form controls into my appForm
     */
    this.appForm = this._formBuilder.group({
      formBody: formBodyControls
    });

    this.validation = new LoginValidation(this);
  }

  prepareFormBodyControls(): FormGroup {
    //// debugger;
    var bodyControl = this.scaffoldFormControl();
    var bodyFormGroup = this._formBuilder.group(bodyControl);

    return bodyFormGroup;
  }

  scaffoldFormControl(): LoginFormControl {
    var bodyControl: LoginFormControl = {
      email: this._formBuilder.control({ value: '', disabled: false }, [Validators.required, Validators.email]),
      password: this._formBuilder.control({ value: '', disabled: false }, [Validators.required]),
    };

    return bodyControl;
  }

  ngxOnSubmit() {
    var rawValue = this.appForm.getRawValue();

    var MUT_VARS = { item: rawValue.formBody }

    let appQueryImpl = this.appQueryImpl(MUT_VARS);

    this.isLoading = true;

    appQueryImpl.subscribe((result) => {
      const id = result.user?.id || '';
      const token = result.token || '';
      this.saveUserData(id, token);
      console.log('result: ', result);
      this.isLoading = false;
      this.alertService.open('', {
        label: `login Success!`,
        status: TuiNotification.Success,
        autoClose: true,
      }).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
      this.router.navigate(['/']);

    }, (error) => {
      this.isLoading = false;
      this.alertService.open(error, {
        label: `login Failed!!!`,
        status: TuiNotification.Error,
        autoClose: true,
      }).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
    });
  }

  appQueryImpl(vars: any) {
    let p$ = this.apollo.query<SignInUserMutationResponse>({
      query: SIGNIN_USER_QUERRY,
      variables: vars
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let _item = item ? (<any>item).login as string : null;
        return {
          user: {
            id: 'user'
          },
          token: _item
        };
      }),
      catchError(err => {
        let errors =  err.toString().split(' ');
        let errorMessage = errors[errors.length - 1];
        return throwError(errorMessage);
      }),
      timeout(20000),
      takeLast(1)
    )

    return p$;
  }

  saveUserData(id: string, token: string) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this._authService.setUserId(id);
  }
}
