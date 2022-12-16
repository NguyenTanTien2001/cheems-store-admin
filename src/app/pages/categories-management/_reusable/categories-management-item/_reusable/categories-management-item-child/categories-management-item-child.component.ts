import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { tap, switchMap, map, timeout, takeLast, catchError, filter } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { GraphQLFormViewComponent } from 'src/app/components/framework/form-view/graphql-form-view.component';
import { Category } from 'src/app/data/models/category.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesManagementItemChildValidation } from './categories-management-item-child.validation';
import { CategoriesManagementItemChildFormControl } from './_form-control/categories-management-item-child-form-control';
import { CREATE_CATEGORY_TYPE } from './_graphql/create-category.graphql';
import { CategoriesManagementItemChildPageViewModel } from './_models/categories-management-item-child-page-view.model';
import { CategoriesManagementItemChildViewData } from './_models/categories-management-item-child-view-data.model';
import { CategoriesManagementItemChildViewResult } from './_models/categories-management-item-child-view-result.model';

@Component({
  selector: 'app-categories-management-item-child',
  templateUrl: './categories-management-item-child.component.html',
  styleUrls: ['./categories-management-item-child.component.scss']
})
export class CategoriesManagementItemChildComponent extends GraphQLFormViewComponent<CategoriesManagementItemChildPageViewModel> implements OnInit {
  public validation: CategoriesManagementItemChildValidation;

  constructor(
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper,
    public _authService: AuthService,
    private apollo: Apollo,
    private route: Router
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject<CategoriesManagementItemChildPageViewModel>(new CategoriesManagementItemChildPageViewModel);

    this.appForm = this.appCreateFormGroup({}, this.prepareFormBodyControls(
      new CategoriesManagementItemChildViewResult(new Category())
    ));

    this.validation = new CategoriesManagementItemChildValidation(this);

  }

  override ngOnInit(): void {
    super.ngOnInit();


    const onInitDropdowns$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        let viewData_ = viewData as CategoriesManagementItemChildViewData;

        if (viewData_) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{ CategoryIdentifier: viewData_.categoryIdentifier}
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


          let viewData_ = viewData as CategoriesManagementItemChildViewData;

          if (viewData_) {
            this.pageViewModel$.next({ ...this.pageViewModel$.getValue(), ...{} });
          }
        }),
        switchMap(([viewData]) => {
          let viewData_ = viewData as CategoriesManagementItemChildViewData;


          if (!(!!viewData_)) {
            let _tempResult = {
              categoryResult: new Category()
            };
            return of(_tempResult);
          }

          let _identifier = viewData_.categoryIdentifier ? viewData_.categoryIdentifier : null;


          if (!(!!_identifier)) {
            let _tempResult = {
              categoryResult: new  Category()
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
      map((onInitResult: CategoriesManagementItemChildViewResult) => {
        const _ = {
          categoryResult: (onInitResult).categoryResult,
        } as CategoriesManagementItemChildViewResult;

        return _;

      })
    )

    const onInit = piped$.subscribe((_: CategoriesManagementItemChildViewResult) => {
        const childComponentViewResult = _;


        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(), ...{
             componentResult: childComponentViewResult.categoryResult
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

  prepareFormBodyControls(results: CategoriesManagementItemChildViewResult): FormGroup {
    const bodyControl = this.scaffoldFormControl(results.categoryResult);
    const bodyFormGroup = this._formBuilder.group(bodyControl);

    return bodyFormGroup;
  }

  scaffoldFormControl(anyResult: Category): CategoriesManagementItemChildFormControl {
    const bodyControl: CategoriesManagementItemChildFormControl = {
      id: new FormControl(anyResult.id),
      name: new FormControl(anyResult.name),
      description: new FormControl(anyResult.description)
    };

    return bodyControl;
  }

  appOnInit(MUT_VARS: any): Observable<CategoriesManagementItemChildViewResult> {
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
          console.log('add category success!');
          this.route.navigate(['categories']);
        }
      });

      this.subscriptions$.push(appMutationImpl$);

    } else if (_componentMode === ComponentMode.EditMode) {
      // Edit Mode

      const appMutationInit2Impl = this.appUpdateMutationImpl(MUT_VARS);

      const appMutationInit2Impl$ = appMutationInit2Impl.subscribe(_ => {
        if(_) {
          console.log('update category success!');
          this.route.navigate(['categories']);
        }
      });

      this.subscriptions$.push(appMutationInit2Impl$);
    }
  }

  appQueryImpl(vars: any) {

    const data: any[] = [];
    const result = data.find((val, elem) => {
      return vars.id === val.id;
    });

    const temp$ = {
      categoryResult: result
    } as CategoriesManagementItemChildViewResult

    return of(temp$);
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
      mutation: CREATE_CATEGORY_TYPE,
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
        let category = item ? (<any>item)?.createCategory?.categories as Category : null;
        return {
          category
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
      price: vars.item.price,
      categories: vars.item.category,
      warrentyDate: vars.item.warrentyDate,
      metaData: vars.item.metaData,
     };

    return of({});
  }

  btnClose() {
    this.route.navigate(["products"]);
  }
}
