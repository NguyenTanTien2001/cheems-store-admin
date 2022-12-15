import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo, Mutation } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, throwError } from 'rxjs';
import { tap, switchMap, map, timeout, takeLast, catchError } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { GraphQLFormViewComponent } from 'src/app/components/framework/form-view/graphql-form-view.component';
import { Category } from 'src/app/data/models/category.model';
import { ProductType } from 'src/app/data/models/product-type.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsManagementItemChildValidation } from './products-management-item-child-form.validation';
import { ProductsManagementItemChildFormControl } from './_form-control/products-management-item-child-form-control';
import { CREATE_PRODUCT_TYPE } from './_grapqls/create-product-type.graphql';
import { GET_CATEGORY_LIST } from './_grapqls/get-category-list.graphql';
import { ProductsManagementItemChildPageViewModel } from './_models/products-management-item-child-page-view.model';
import { ProductsManagementItemChildViewData } from './_models/products-management-item-child-view-data.model';
import { ProductsManagementItemChildViewResult } from './_models/products-management-item-child-view-result.model';

@Component({
  selector: 'app-products-management-item-child',
  templateUrl: './products-management-item-child.component.html',
  styleUrls: ['./products-management-item-child.component.scss']
})
export class ProductsManagementItemChildComponent extends GraphQLFormViewComponent<ProductsManagementItemChildPageViewModel> implements OnInit {
  public validation: ProductsManagementItemChildValidation;

  getCategoriesData(vars: any) {

    let p$ = this.apollo.query({
      query: GET_CATEGORY_LIST,
      variables: vars
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let _item = item ? (<any>item).categories.nodes as Category[] : [];
        return _item;
      }),
      catchError(err => {
        let errors =  err.toString().split(' ');
        let errorMessage = errors[errors.length - 1];
        return throwError(errorMessage);
      }),
    )
    return p$;
  }

  constructor(
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper,
    public _authService: AuthService,
    private apollo: Apollo,
    private route: Router
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject<ProductsManagementItemChildPageViewModel>(new ProductsManagementItemChildPageViewModel);

    this.appForm = this.appCreateFormGroup({}, this.prepareFormBodyControls(
      new ProductsManagementItemChildViewResult(new ProductType())
    ));

    this.validation = new ProductsManagementItemChildValidation(this);

  }

  override ngOnInit(): void {
    super.ngOnInit();


    const onInitDropdowns$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        let viewData_ = viewData as ProductsManagementItemChildViewData;

        if (viewData_) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{ ProductTypeIdentifier: viewData_.productTypeIdentifier}
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
        const categories: Category[] = onInitResult.categories.map((val) => val);


        const _ = {
          categories
        };

        return _;
      }));

    const onInitDropdowns = pipedDropdowns$.subscribe(_ => {
        const childComponentViewResult = _;

        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{
              categoriesDropdown: childComponentViewResult.categories
            }
          });
        }
      });

    this.subscriptions$.push(onInitDropdowns);



    const onInit$ = combineLatest([this.items$]).pipe(
        tap(([viewData]) => {


          let viewData_ = viewData as ProductsManagementItemChildViewData;

          if (viewData_) {
            this.pageViewModel$.next({ ...this.pageViewModel$.getValue(), ...{} });
          }
        }),
        switchMap(([viewData]) => {
          let viewData_ = viewData as ProductsManagementItemChildViewData;


          if (!(!!viewData_)) {
            let _tempResult = {
              productTypeResult: new ProductType()
            };
            return of(_tempResult);
          }

          let _identifier = viewData_.productTypeIdentifier ? viewData_.productTypeIdentifier : null;


          if (!(!!_identifier)) {
            let _tempResult = {
              productTypeResult: new  ProductType()
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
      map((onInitResult: ProductsManagementItemChildViewResult) => {
        const _ = {
          productTypeResult: (onInitResult).productTypeResult,
        } as ProductsManagementItemChildViewResult;

        return _;

      })
    )

    const onInit = piped$.subscribe((_: ProductsManagementItemChildViewResult) => {
        const childComponentViewResult = _;


        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(), ...{
             componentResult: childComponentViewResult.productTypeResult
            }
          });


          const formBodyControls = this.prepareFormBodyControls(childComponentViewResult);


          this.appForm = this.appCreateFormGroup({}, formBodyControls);

          console.log(this.formBody());
        }
    });

    this.subscriptions$.push(onInit);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  prepareFormBodyControls(results: ProductsManagementItemChildViewResult): FormGroup {
    const bodyControl = this.scaffoldFormControl(results.productTypeResult);
    const bodyFormGroup = this._formBuilder.group(bodyControl);

    return bodyFormGroup;
  }

  scaffoldFormControl(anyResult: ProductType): ProductsManagementItemChildFormControl {
    const bodyControl: ProductsManagementItemChildFormControl = {
      id: new FormControl(anyResult.id),
      name: new FormControl(anyResult.name),
      description: new FormControl(anyResult.description),
      price: new FormControl(anyResult.price),
      category: new FormControl(anyResult.categories),
      warrentyDate: new FormControl(anyResult.warrentyDate),
      metaData: new FormControl(anyResult.metaData),
    };

    return bodyControl;
  }

  appOnInit(MUT_VARS: any): Observable<ProductsManagementItemChildViewResult> {
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
          console.log('add Product type success!');
          this.route.navigate(['products']);
        }
      });

      this.subscriptions$.push(appMutationImpl$);

    } else if (_componentMode === ComponentMode.EditMode) {
      // Edit Mode

      const appMutationInit2Impl = this.appUpdateMutationImpl(MUT_VARS);

      const appMutationInit2Impl$ = appMutationInit2Impl.subscribe(_ => {
        console.log('update Product type success!');
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
      productTypeResult: result
    } as ProductsManagementItemChildViewResult

    return of(temp$);
  }

  appDropdownsQueryImpl(vars: any) {
    var MUT_VARS = {
      // input: {},
      // first: 0,
      // after: '',
      // last: 0,
      // before: ''
    }
    let p$ = this.apollo.query({
      query: GET_CATEGORY_LIST,
      variables: vars
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let categories = item ? (<any>item).categories.nodes as Category[] : [];
        return {
          categories
        };
      }),
      catchError(err => {
        let errors =  err.toString().split(' ');
        let errorMessage = errors[errors.length - 1];
        return throwError(errorMessage);
      }),
    )

    return p$;
  }

  appCreateMutationImpl(vars: any) {
    const item = {
      name: vars.item.name,
      description: vars.item.description,
      price: vars.item.price,
      categoriesId: vars.item.category.id,
      warrentyDate: vars.item.warrentyDate,
      metaData: vars.item.metaData,
    };
    const MUT_VARS = {
      input: item
    }
    const token = this._authService.getToken();
    let p$ = this.apollo.mutate({
      mutation: CREATE_PRODUCT_TYPE,
      variables: MUT_VARS,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        }
      }
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let productType = item ? (<any>item)?.createProductType?.productTypes as ProductType : null;
        return {
          productType
        };
      }),
      catchError(err => {
        return throwError(err);
      }),
    )
    return p$;
  }

  appUpdateMutationImpl(vars: any) {
    const item: ProductType = {
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

  btnTesting() {
    console.log(this.pageViewModel$.getValue().categoriesDropdown);
  }

}
