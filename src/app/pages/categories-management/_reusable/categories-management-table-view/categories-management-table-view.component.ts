import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { cpuUsage } from 'process';
import { BehaviorSubject, combineLatest, of, throwError, take, timeout } from 'rxjs';
import { tap, switchMap, map, catchError } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { GraphQLFormBasedTableViewComponent, IGraphQLFormBasedTableViewComponent } from 'src/app/components/framework/table-view/graphql-table-form-based-view.component';
import { Category, categoryTest } from 'src/app/data/models/category.model';
import { ProductType } from 'src/app/data/models/product-type.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Filters } from '../../_models/filters.model';
import { CategoriesManagementFilterHeaderViewData } from '../categories-management-filter-header/_models/categories-management-filter-header-view-data.model';
import { CategoriesManagementFormControl } from './_form-control/categories-management-table-view-form-control';
import { DELETE_CATEGORIES_MUTATION } from './_graphql/delete-categories.graphql';
import { GET_CATEGORIES_LIST_QUERRY } from './_graphql/get-categories-list.graphql';
import { CategoriesManagementTableViewPageViewModel } from './_models/categories-management-table-view-page-view.model';
import { CategoriesManagementTableViewViewData } from './_models/categories-management-table-view-view-data.model';
import { CategoriesManagementTableViewResult } from './_models/categories-management-table-view-view-result.model';

@Component({
  selector: 'app-categories-management-table-view',
  templateUrl: './categories-management-table-view.component.html',
  styleUrls: ['./categories-management-table-view.component.scss']
})
export class CategoriesManagementTableViewComponent
extends GraphQLFormBasedTableViewComponent<CategoriesManagementTableViewPageViewModel>
implements IGraphQLFormBasedTableViewComponent<CategoriesManagementTableViewPageViewModel>, OnInit, OnDestroy {
  testValue = new FormControl(true);
  expandedElement!: ProductType | null;

  public filterHeaderViewData$: BehaviorSubject<CategoriesManagementFilterHeaderViewData>;
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
      new CategoriesManagementTableViewPageViewModel();
    _pageViewModel.paginationIdx =
      'CategoriesManagementTableViewPaginator';

    this.filterHeaderViewData$ = new BehaviorSubject<CategoriesManagementFilterHeaderViewData>(
      new CategoriesManagementFilterHeaderViewData
    );

    this.pageViewModel$ = new BehaviorSubject<CategoriesManagementTableViewPageViewModel>(
      _pageViewModel
    );

    this.appForm = this.appCreateFormGroup({}, []);

    this.filters$ = new BehaviorSubject<Filters>(new Filters(''));

 }

  override ngOnInit(): void {
    super.ngOnInit();

    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        const _viewData = viewData as CategoriesManagementTableViewViewData;
        if (_viewData) {
          this.CURRENT_PAGE = _viewData.page || 1;

          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
          });
        }
      }),
      switchMap(([viewData]) => {
        const _viewData = viewData as CategoriesManagementTableViewViewData;
        const MUT_VARS = {
          keyword: _viewData.keyword,
          page: _viewData.page || 1,
        };

        this.setCustomDisplayParameters(_viewData);

        return this.appOnInit(MUT_VARS);
      })
    );

    const piped$ = onInit$;
    const onInit = piped$.subscribe((tableViewResult: CategoriesManagementTableViewResult) => {
      const _tableViewResult = tableViewResult;
      console.log(_tableViewResult);
      this.COUNT = _tableViewResult.count;
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
          tableViewResult: _tableViewResult,
          tableDisplayInformation: this.buildShowingResultModel(),
        },
      });

      const formBodyControls = this.prepareFormBodyControls(
        _tableViewResult.allCategories
      );

      this.appForm = this.appCreateFormGroup({}, formBodyControls);
    });
    this.subscriptions$.push(onInit);

  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.apollo.client.resetStore()
  }

  public prepareFormBodyControls(products: Category[]): FormGroup[] {
    let formBodyControls: FormGroup[] = [];
    const selectIdx = this.pageViewModel$.getValue().selectIdx;

    products.map((val, index) => {
      const bodyControl = this.scaffoldFormControl(val, selectIdx);
      formBodyControls.push(this._formBuilder.group(bodyControl));
    });

    return formBodyControls;
  }

  scaffoldFormControl(product: Category, selectIdx: boolean = false): CategoriesManagementFormControl {
    const bodyControl: CategoriesManagementFormControl = {
      idxSelected: new FormControl(selectIdx),
      id: new FormControl(product.id),
      name: new FormControl(product.name),
      description: new FormControl(product.description),
    };

    return bodyControl;
  }

  public appOnInit(MUT_VARS: any) {
    let initQuery$ = this.appQueryImpl(MUT_VARS);
    return initQuery$;
  }

  public appQueryImpl(vars: any) {
    let categoriesFilter = {
      names: vars.keyword.length!==0?vars.keyword:null,
    }
    let categoriesQueryData = {
      input: categoriesFilter,
      first: this.PAGE_SIZE,
      after: this.cursor.length!==0?this.cursor:null,
    }
    let p$ = this.apollo.query({
      fetchPolicy: "network-only",
      query: GET_CATEGORIES_LIST_QUERRY,
      variables: categoriesQueryData
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let categories = item ? (<any>item).categories.nodes as Category[] : [];
        let totalCount = item ? (<any>item).categories.totalCount: 0;
        return {
          allCategories: categories,
          count: totalCount
        } as CategoriesManagementTableViewResult;
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
      mutation: DELETE_CATEGORIES_MUTATION,
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
        let productType = item ? (<any>item)?.categories as Category : null;
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
