import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { LifetimeManagement } from 'src/app/components/framework/base/lifetime-management';
import { Filters } from './_models/filters.model';
import { CategoriesManagementFilterHeaderViewData } from './_reusable/categories-management-filter-header/_models/categories-management-filter-header-view-data.model';
import { CategoriesManagementTableViewViewData } from './_reusable/categories-management-table-view/_models/categories-management-table-view-view-data.model';

@Component({
  selector: 'app-categories-management',
  templateUrl: './categories-management.component.html',
  styleUrls: ['./categories-management.component.scss']
})
export class CategoriesManagementComponent extends LifetimeManagement implements OnInit {

  public filterViewData$: BehaviorSubject<CategoriesManagementFilterHeaderViewData>;
  public tableViewData$: BehaviorSubject<CategoriesManagementTableViewViewData>;

  public filters$!: BehaviorSubject<Filters>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.filterViewData$ = new BehaviorSubject<CategoriesManagementFilterHeaderViewData>(new CategoriesManagementFilterHeaderViewData);
    this.tableViewData$ = new BehaviorSubject<CategoriesManagementTableViewViewData>(new CategoriesManagementTableViewViewData);

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
        new CategoriesManagementFilterHeaderViewData(this.filters$)
      );
      this.tableViewData$.next(
        new CategoriesManagementTableViewViewData(keyword, page)
      );
    });

    this.subscriptions$.push(onInit);

    const onRefreshFilter$ = combineLatest([this.filters$]).pipe(
      switchMap(([filtersParams]) => {
        console.log(filtersParams);
        const tableViewData: CategoriesManagementTableViewViewData = {
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
      (tableViewData: CategoriesManagementTableViewViewData) => {
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
