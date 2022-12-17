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
import { Manufacture } from 'src/app/data/models/manufacture.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Filters } from '../../_models/filters.model';
import { ManufacturesManagementFilterHeaderViewData } from '../manufactures-management-filter-header/_models/manufactures-management-filter-header-view-data.model';
import { ManufacturesManagementFormControl } from './_form-control/manufactures-management-table-view-form-control';
import { DELETE_MANUFACTURE_MUTATION } from './_graphql/delete-manufactures.graphql';
import { GET_MANUFACTURES_LIST_QUERRY } from './_graphql/get-manufactures-list.graphql';
import { ManufacturesManagementTableViewPageViewModel } from './_models/manufactures-management-table-view-page-view.model';
import { ManufacturesManagementTableViewViewData } from './_models/manufactures-management-table-view-view-data.model';
import { ManufacturesManagementTableViewResult } from './_models/manufactures-management-table-view-view-result.model';

@Component({
  selector: 'app-manufactures-management-table-view',
  templateUrl: './manufactures-management-table-view.component.html',
  styleUrls: ['./manufactures-management-table-view.component.scss']
})
export class ManufacturesManagementTableViewComponent
extends GraphQLFormBasedTableViewComponent<ManufacturesManagementTableViewPageViewModel>
implements IGraphQLFormBasedTableViewComponent<ManufacturesManagementTableViewPageViewModel>, OnInit, OnDestroy {
  testValue = new FormControl(true);
  expandedElement!: Manufacture | null;

  public filterHeaderViewData$: BehaviorSubject<ManufacturesManagementFilterHeaderViewData>;
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
      new ManufacturesManagementTableViewPageViewModel();
    _pageViewModel.paginationIdx =
      'ManufacturesManagementTableViewPaginator';

    this.filterHeaderViewData$ = new BehaviorSubject<ManufacturesManagementFilterHeaderViewData>(
      new ManufacturesManagementFilterHeaderViewData
    );

    this.pageViewModel$ = new BehaviorSubject<ManufacturesManagementTableViewPageViewModel>(
      _pageViewModel
    );

    this.appForm = this.appCreateFormGroup({}, []);

    this.filters$ = new BehaviorSubject<Filters>(new Filters(''));

 }

  override ngOnInit(): void {
    super.ngOnInit();

    const onInit$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        const _viewData = viewData as ManufacturesManagementTableViewViewData;
        if (_viewData) {
          this.CURRENT_PAGE = _viewData.page || 1;

          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
          });
        }
      }),
      switchMap(([viewData]) => {
        const _viewData = viewData as ManufacturesManagementTableViewViewData;
        const MUT_VARS = {
          keyword: _viewData.keyword,
          page: _viewData.page || 1,
        };

        this.setCustomDisplayParameters(_viewData);

        return this.appOnInit(MUT_VARS);
      })
    );

    const piped$ = onInit$;
    const onInit = piped$.subscribe((tableViewResult: ManufacturesManagementTableViewResult) => {
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
        _tableViewResult.allManufactures
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

  scaffoldFormControl(product: Category, selectIdx: boolean = false): ManufacturesManagementFormControl {
    const bodyControl: ManufacturesManagementFormControl = {
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
      isDeleted: false
    }
    let categoriesQueryData = {
      input: categoriesFilter,
      first: this.PAGE_SIZE,
      after: this.cursor.length!==0?this.cursor:null,
    }
    let p$ = this.apollo.query({
      fetchPolicy: "network-only",
      query: GET_MANUFACTURES_LIST_QUERRY,
      variables: categoriesQueryData
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let manufacturers = item ? (<any>item).manufacturers.nodes as Manufacture[] : [];
        let totalCount = item ? (<any>item).manufacturers.totalCount: 0;
        return {
          allManufactures: manufacturers,
          count: totalCount
        } as ManufacturesManagementTableViewResult;
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
    let deleteManufactureImpl$ = this.deleteManufacturesImpl(MUT_VARS);
    let deleteManufactureImpl = deleteManufactureImpl$.subscribe(_ => {

    })
    this.subscriptions$.push(deleteManufactureImpl);

    this.items$.next({
      ...this.items$.getValue()
    })
  }

  deleteManufacturesImpl(vars: any) {
    const token = this._authService.getToken();
    let p$ = this.apollo.mutate({
      mutation: DELETE_MANUFACTURE_MUTATION,
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
        let manufacture = item ? (<any>item)?.deleteManufacturer.manufacturers as Manufacture : null;
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

}
