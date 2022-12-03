import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { LifetimeManagement } from 'src/app/components/framework/base/lifetime-management';
import { Filters } from './_models/filters.model';
import { ProductsManagementFilterHeaderViewData } from './_reusable/products-management-filter-header/_models/products-management-filter-header-view-data.model';
import { ProductsManagementTableViewViewData } from './_reusable/products-management-table-view/_models/products-management-table-view-view-data.model';

@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent extends LifetimeManagement implements OnInit {

  public filterViewData$: BehaviorSubject<ProductsManagementFilterHeaderViewData>;
  public tableViewData$: BehaviorSubject<ProductsManagementTableViewViewData>;

  public filters$!: BehaviorSubject<Filters>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.filterViewData$ = new BehaviorSubject<ProductsManagementFilterHeaderViewData>(new ProductsManagementFilterHeaderViewData);
    this.tableViewData$ = new BehaviorSubject<ProductsManagementTableViewViewData>(new ProductsManagementTableViewViewData);

    this.filters$ = new BehaviorSubject<Filters>(new Filters(''));
   }

  override ngOnInit(): void {
    const onInit$ = combineLatest([this.appRouteQueryParams$()]).pipe(
      tap(([queryParams]) => {
        const page = queryParams['page'] || 1;
        const keyword = queryParams['keyword'] || '';
        this.filters$.next({
          ...this.filters$.getValue(),
          ...{ keyword: keyword, page: page },
        });
      }),
      switchMap(([queryParams]) => {
        const page = queryParams['page'] || 1;
        const keyword = queryParams['keyword'] || '';

        return of({ page, keyword });
      })
    );
    const piped$ = onInit$;

    const onInit = piped$.subscribe(({ page, keyword }) => {
      this.filterViewData$.next(
        new ProductsManagementFilterHeaderViewData(this.filters$)
      );
      this.tableViewData$.next(
        new ProductsManagementTableViewViewData(keyword, page)
      );
    });

    this.subscriptions$.push(onInit);

    const onRefreshFilter$ = combineLatest([this.filters$]).pipe(
      switchMap(([filtersParams]) => {
        console.log(filtersParams);
        const tableViewData: ProductsManagementTableViewViewData = {
          selectIdx: false,
          keyword: filtersParams ? filtersParams.keyword : '',
          page: filtersParams ? filtersParams.page : 1,
          size: 10,
          sort: '|',

        };
        return of(tableViewData);
      })
    );

    const pipedFilters$ = onRefreshFilter$;

    const onRefreshFilters = pipedFilters$.subscribe(
      (tableViewData: ProductsManagementTableViewViewData) => {
        this.tableViewData$.next(tableViewData);
      }
    );
  }

  public appRouteQueryParams$(): Observable<Params> {
    return this.activatedRoute.queryParams;
  }

  createProduct(): void {
    this.router.navigate(['item'], { relativeTo: this.activatedRoute });
  }


}
