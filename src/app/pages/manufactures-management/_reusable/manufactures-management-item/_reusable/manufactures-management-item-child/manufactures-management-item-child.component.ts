import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { tap, switchMap, map, timeout, takeLast, catchError, filter, take } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { GraphQLFormViewComponent } from 'src/app/components/framework/form-view/graphql-form-view.component';
import { Manufacture } from 'src/app/data/models/manufacture.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ManufacturesManagementItemChildValidation } from './manufactures-management-item-child.validation';
import { ManufacturesManagementItemChildFormControl } from './_form-control/manufactures-management-item-child-form-control';
import { CREATE_MANUFACTURE } from './_graphql/create-manufacture.graphql';
import { GET_MANUFACTURE_BY_ID_QUERRY } from './_graphql/get-manufacture-by-id.graphql';
import { UPDATE_MANUFACTURE } from './_graphql/update-manufacture.graphql';
import { ManufacturesManagementItemChildPageViewModel } from './_models/manufactures-management-item-child-page-view.model';
import { ManufacturesManagementItemChildViewData } from './_models/manufactures-management-item-child-view-data.model';
import { ManufacturesManagementItemChildViewResult } from './_models/manufactures-management-item-child-view-result.model';

@Component({
  selector: 'app-manufactures-management-item-child',
  templateUrl: './manufactures-management-item-child.component.html',
  styleUrls: ['./manufactures-management-item-child.component.scss']
})
export class ManufacturesManagementItemChildComponent extends GraphQLFormViewComponent<ManufacturesManagementItemChildPageViewModel> implements OnInit {
  public validation: ManufacturesManagementItemChildValidation;

  constructor(
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper,
    public _authService: AuthService,
    private apollo: Apollo,
    private route: Router
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject<ManufacturesManagementItemChildPageViewModel>(new ManufacturesManagementItemChildPageViewModel);

    this.appForm = this.appCreateFormGroup({}, this.prepareFormBodyControls(
      new ManufacturesManagementItemChildViewResult(new Manufacture())
    ));

    this.validation = new ManufacturesManagementItemChildValidation(this);

  }

  override ngOnInit(): void {
    super.ngOnInit();


    const onInitDropdowns$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        let viewData_ = viewData as ManufacturesManagementItemChildViewData;

        if (viewData_) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{ manufactureIdentifier: viewData_.manufactureIdentifier}
          });
        }
      }),
      switchMap(([viewData]) => {
        const appOnInit$ = this.appOnInitDropdowns(this.__MUT_VARS());
        return appOnInit$;
      })
    );

    const pipedDropdowns$ = onInitDropdowns$.pipe(
      map((onInitResult) => {
        const _ = {
        };

        return _;
      }));

    const onInitDropdowns = pipedDropdowns$.subscribe(_ => {
        const childComponentViewResult = _;

        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue()
          });
        }
      });

    this.subscriptions$.push(onInitDropdowns);



    const onInit$ = combineLatest([this.items$]).pipe(
        tap(([viewData]) => {


          let viewData_ = viewData as ManufacturesManagementItemChildViewData;

          if (viewData_) {
            this.pageViewModel$.next({ ...this.pageViewModel$.getValue(), ...{} });
          }
        }),
        switchMap(([viewData]) => {
          let viewData_ = viewData as ManufacturesManagementItemChildViewData;


          if (!(!!viewData_)) {
            let _tempResult = {
              manufactureResult: new Manufacture()
            };
            return of(_tempResult);
          }

          let _identifier = viewData_.manufactureIdentifier ? viewData_.manufactureIdentifier : null;


          if (!(!!_identifier)) {
            let _tempResult = {
              manufactureResult: new  Manufacture()
            };
            return of(_tempResult);
          }


          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{
              componentMode: ComponentMode.EditMode
            }
          });

          var MUT_VARS: any = this.__MUT_VARS();


          MUT_VARS.id = _identifier;

          const appOnInit$ = this.appOnInit(MUT_VARS);

          return appOnInit$;
        })
    );

    const piped$ = (onInit$).pipe(
      map((onInitResult: ManufacturesManagementItemChildViewResult) => {
        const _ = {
          manufactureResult: (onInitResult).manufactureResult,
        } as ManufacturesManagementItemChildViewResult;

        return _;

      })
    )

    const onInit = piped$.subscribe((_: ManufacturesManagementItemChildViewResult) => {
        const childComponentViewResult = _;


        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(), ...{
             componentResult: childComponentViewResult.manufactureResult
            }
          });


          const formBodyControls = this.prepareFormBodyControls(childComponentViewResult);


          this.appForm = this.appCreateFormGroup({}, formBodyControls);

          // console.log(this.formBody());
        }
    });
    this.subscriptions$.push(onInit);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  prepareFormBodyControls(results: ManufacturesManagementItemChildViewResult): FormGroup {
    const bodyControl = this.scaffoldFormControl(results.manufactureResult);
    const bodyFormGroup = this._formBuilder.group(bodyControl);

    return bodyFormGroup;
  }

  scaffoldFormControl(anyResult: Manufacture): ManufacturesManagementItemChildFormControl {
    const bodyControl: ManufacturesManagementItemChildFormControl = {
      id: new FormControl(anyResult.id),
      name: new FormControl(anyResult.name),
      description: new FormControl(anyResult.description)
    };

    return bodyControl;
  }

  appOnInit(MUT_VARS: any): Observable<ManufacturesManagementItemChildViewResult> {
    const initQuery$ = this.appQueryImpl(MUT_VARS);
    return initQuery$;
  }

  appOnInitDropdowns(MUT_VARS: { filters: {}; }) {
    const initQuery$ = this.appDropdownsQueryImpl(MUT_VARS);
    return initQuery$;
  }

  ngxOnSubmit(): void {

    const rawValue = this.appForm.getRawValue();

    let _componentMode = this.pageViewModel$.getValue().componentMode;


    const MUT_VARS = { item: rawValue.formBody };

    if (_componentMode === ComponentMode.CreateMode) {
      // Create Mode
      const appMutationImpl = this.appCreateMutationImpl(MUT_VARS);

      const appMutationImpl$ = appMutationImpl.subscribe(_ => {
        if(_) {
          console.log('add manufacture success!');
          this.route.navigate(['manufactures']);
        }
      });

      this.subscriptions$.push(appMutationImpl$);

    } else if (_componentMode === ComponentMode.EditMode) {
      // Edit Mode

      const appMutationInit2Impl = this.appUpdateMutationImpl(MUT_VARS);

      const appMutationInit2Impl$ = appMutationInit2Impl.subscribe(_ => {
        if(_) {
          console.log('update manufacture success!');
          this.route.navigate(['manufactures']);
        }
      });

      this.subscriptions$.push(appMutationInit2Impl$);
    }
  }

  appQueryImpl(vars: any) {
    let manufacturersFilter = {
      ids: [this.pageViewModel$.getValue().manufactureIdentifier],
    }
    let manufacturersQueryData = {
      input: manufacturersFilter
    }
    let p$ = this.apollo.query({
      fetchPolicy: "network-only",
      query: GET_MANUFACTURE_BY_ID_QUERRY,
      variables: manufacturersQueryData
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let manufacturers = item ? (<any>item).manufacturers.nodes as Manufacture[] : [];
        return {
          manufactureResult: manufacturers[0]
        } as ManufacturesManagementItemChildViewResult;
      }),
      catchError(err => {
        let errors =  err.toString().split(' ');
        let errorMessage = errors[errors.length - 1];
        return throwError(errorMessage);
      }),
      timeout(20000),
      take(1),
    )

    return p$;
  }

  appDropdownsQueryImpl(vars: any) {
    return of();
  }

  appCreateMutationImpl(vars: any) {
    const item = {
      name: vars.item.name,
      description: vars.item.description
    };
    const MUT_VARS = {
      input: item,
    }
    const token = this._authService.getToken();
    let p$ = this.apollo.mutate({
      mutation: CREATE_MANUFACTURE,
      variables: MUT_VARS,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
        useMultipart: true
      }
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let manufacture = item ? (<any>item)?.createManufacturer?.manufacturers as Manufacture : null;
        return {
          manufacture
        };
      }),
      catchError(err => {
        return throwError(err);
      }),
    )
    return p$;
  }

  appUpdateMutationImpl(vars: any) {
    const item = {
      id: vars.item.id,
      name: vars.item.name,
      description: vars.item.description,
    };
    const MUT_VARS = {
      input: item,
    }
    const token = this._authService.getToken();
    let p$ = this.apollo.mutate({
      mutation: UPDATE_MANUFACTURE,
      variables: MUT_VARS,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
        useMultipart: true
      }
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let manufacture = item ? (<any>item)?.updateManufacturer?.manufacturers as Manufacture : null;
        return {
          manufacture
        };
      }),
      catchError(err => {
        return throwError(err);
      }),
    )
    return p$;
  }

  btnClose() {
    this.route.navigate(["products"]);
  }
}
