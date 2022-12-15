import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, combineLatest, of, throwError, take, timeout } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { GraphQLFormBasedTableViewComponent, IGraphQLFormBasedTableViewComponent } from 'src/app/components/framework/table-view/graphql-table-form-based-view.component';
import { Category, categoryTest } from 'src/app/data/models/category.model';
import { ProductType } from 'src/app/data/models/product-type.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Filters } from '../../_models/filters.model';
import { ProductsManagementFilterHeaderViewData } from '../products-management-filter-header/_models/products-management-filter-header-view-data.model';
import { ProductsManagementFormControl } from './_form-control/products-management-form-control';
import { DELETE_PRODUCT_TYPE_MUTATION } from './_graphql/delete-product-type.graphql';
import { GET_PRODUCT_TYPE_LIST_QUERRY } from './_graphql/get-product-type-list.graphql';
import { ProductsManagementTableViewPageViewModel } from './_models/products-management-table-view-page-view.model';
import { ProductsManagementTableViewViewData } from './_models/products-management-table-view-view-data.model';
import { ProductsManagementTableViewResult } from './_models/products-management-table-view-view-result.model';

@Component({
  selector: 'app-products-management-table-view',
  templateUrl: './products-management-table-view.component.html',
  styleUrls: ['./products-management-table-view.component.scss']
})
export class ProductsManagementTableViewComponent
extends GraphQLFormBasedTableViewComponent<ProductsManagementTableViewPageViewModel>
implements IGraphQLFormBasedTableViewComponent<ProductsManagementTableViewPageViewModel>, OnInit, OnDestroy {
  testValue = new FormControl(true);
  expandedElement!: ProductType | null;

  public filterHeaderViewData$: BehaviorSubject<ProductsManagementFilterHeaderViewData>;
  public filters$: BehaviorSubject<Filters>;
  public cursor = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _authService: AuthService,
    private apollo: Apollo,
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper
  ) {
    super(_formBuilder, _dev);

    const _pageViewModel =
      new ProductsManagementTableViewPageViewModel();
    _pageViewModel.paginationIdx =
      'PropertyOtherDetailTableViewPaginator';

    this.filterHeaderViewData$ = new BehaviorSubject<ProductsManagementFilterHeaderViewData>(
      new ProductsManagementFilterHeaderViewData
    );

    this.pageViewModel$ = new BehaviorSubject<ProductsManagementTableViewPageViewModel>(
      _pageViewModel
    );

    this.appForm = this.appCreateFormGroup({}, []);

    this.filters$ = new BehaviorSubject<Filters>(new Filters(''));

 }

  override ngOnInit(): void {
    super.ngOnInit();

    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        console.log('bbbbbbbbbbbbbbbbb');
        const _viewData = viewData as ProductsManagementTableViewViewData;
        if (_viewData) {
          this.CURRENT_PAGE = _viewData.page || 1;

          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
          });
        }
      }),
      switchMap(([viewData]) => {
        const _viewData = viewData as ProductsManagementTableViewViewData;
        const MUT_VARS = {
          keyword: _viewData.keyword,
          page: _viewData.page || 1,
        };

        this.setCustomDisplayParameters(_viewData);

        return this.appOnInit(MUT_VARS);
      })
    );

    const piped$ = onInit$;
    const onInit = piped$.subscribe((tableViewResult: ProductsManagementTableViewResult) => {
      const _tableViewResult = tableViewResult;
      this.COUNT = _tableViewResult.count;
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
          tableViewResult: _tableViewResult,
          tableDisplayInformation: this.buildShowingResultModel(),
        },
      });

      const formBodyControls = this.prepareFormBodyControls(
        _tableViewResult.allProducts
      );

      this.appForm = this.appCreateFormGroup({}, formBodyControls);
    });
    this.subscriptions$.push(onInit);

  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.apollo.client.resetStore()
  }

  public prepareFormBodyControls(products: ProductType[]): FormGroup[] {
    let formBodyControls: FormGroup[] = [];
    const selectIdx = this.pageViewModel$.getValue().selectIdx;

    products.map((val, index) => {
      const bodyControl = this.scaffoldFormControl(val, selectIdx);
      formBodyControls.push(this._formBuilder.group(bodyControl));
    });

    return formBodyControls;
  }

  scaffoldFormControl(product: ProductType, selectIdx: boolean = false): ProductsManagementFormControl {
    const bodyControl: ProductsManagementFormControl = {
      idxSelected: new FormControl(selectIdx),
      id: new FormControl(product.id),
      name: new FormControl(product.name),
      description: new FormControl(product.description),
      price: new FormControl(product.price),
      category: new FormControl(product.categories?.map((val) => val.name)),
      warrentyDate: new FormControl(product.warrentyDate),
      metaData: new FormControl(product.metaData),
    };

    return bodyControl;
  }

  public appOnInit(MUT_VARS: any) {
    let initQuery$ = this.appQueryImpl(MUT_VARS);
    return initQuery$;
  }

  public appQueryImpl(vars: any) {
    let productsTypeFilter = {
      names: vars.keyword.length!==0?vars.keyword:null,
    }
    let productsTypeQueryData = {
      input: productsTypeFilter,
      first: this.PAGE_SIZE,
      after: this.cursor.length!==0?this.cursor:null,
    }
    let p$ = this.apollo.query({
      fetchPolicy: "network-only",
      query: GET_PRODUCT_TYPE_LIST_QUERRY,
      variables: productsTypeQueryData
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let productTypes = item ? (<any>item).productTypes.nodes as ProductType[] : [];
        let totalCount = item ? (<any>item).productTypes.totalCount: 0;
        return {
          allProducts: productTypes,
          count: totalCount
        } as ProductsManagementTableViewResult;
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

  onEditPropertyOtherDetail(identifier: string): void {
    this.router.navigate(['item', identifier], {
      relativeTo: this.activatedRoute,
    });
  }

  onRemovePropertyOtherDetail(id: any) {
    const MUT_VARS = {
      input: {
        id: id
      }
    }
    let deleteProductTypeImpl$ = this.deleteProductTypeImpl(MUT_VARS);
    let deleteProductTypeImpl = deleteProductTypeImpl$.subscribe(_ => {

    })
    this.subscriptions$.push(deleteProductTypeImpl);

    this.items$.next({
      ...this.items$.getValue()
    })
  }

  deleteProductTypeImpl(vars: any) {
    const token = this._authService.getToken();
    let p$ = this.apollo.mutate({
      mutation: DELETE_PRODUCT_TYPE_MUTATION,
      variables: vars,
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
        let productType = item ? (<any>item)?.deleteProductType?.productTypes as ProductType : null;
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

}
