import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { LifetimeManagement } from 'src/app/components/framework/base/lifetime-management';
import { Filters } from './_models/filters.model';
import { ManufacturesManagementFilterHeaderViewData } from './_reusable/manufactures-management-filter-header/_models/manufactures-management-filter-header-view-data.model';
import { ManufacturesManagementTableViewViewData } from './_reusable/manufactures-management-table-view/_models/manufactures-management-table-view-view-data.model';

@Component({
  selector: 'app-manufactures-management',
  templateUrl: './manufactures-management.component.html',
  styleUrls: ['./manufactures-management.component.scss']
})
export class ManufacturesManagementComponent extends LifetimeManagement implements OnInit {

  public filterViewData$: BehaviorSubject<ManufacturesManagementFilterHeaderViewData>;
  public tableViewData$: BehaviorSubject<ManufacturesManagementTableViewViewData>;

  public filters$!: BehaviorSubject<Filters>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
    this.filterViewData$ = new BehaviorSubject<ManufacturesManagementFilterHeaderViewData>(new ManufacturesManagementFilterHeaderViewData);
    this.tableViewData$ = new BehaviorSubject<ManufacturesManagementTableViewViewData>(new ManufacturesManagementTableViewViewData);

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
        new ManufacturesManagementFilterHeaderViewData(this.filters$)
      );
      this.tableViewData$.next(
        new ManufacturesManagementTableViewViewData(keyword, page)
      );
    });

    this.subscriptions$.push(onInit);

    const onRefreshFilter$ = combineLatest([this.filters$]).pipe(
      switchMap(([filtersParams]) => {
        console.log(filtersParams);
        const tableViewData: ManufacturesManagementTableViewViewData = {
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
      (tableViewData: ManufacturesManagementTableViewViewData) => {
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

