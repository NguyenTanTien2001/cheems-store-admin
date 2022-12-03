import { Subscription, BehaviorSubject } from "rxjs";
import { Component, Injectable, OnDestroy, OnInit, QueryList, ViewChildren } from "@angular/core";
import { IPaginatedChildComponent, PaginatedChildComponent } from "../paginated-child-view.component";
import { IBaseChildViewManagement } from "../base-child-view.interface";
import { PageViewModel } from "../_page/pageview.model";
import { TableViewData } from "./_models/table-view-data.model";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { ShowingResultModel } from "../_page/_tables/showing-result.model";
import { NgbdSortableHeader, SortEvent } from "../_page/_tables/sortable/sortable.helper";

declare let mApp: any;

export interface ITableViewComponent<TPageViewModel extends PageViewModel> extends IPaginatedChildComponent, IBaseChildViewManagement {
  //   PAGE_SIZE: number;
  //   CURRENT_PAGE: number;
  //   COUNT: number;
  pageViewModel$: BehaviorSubject<TPageViewModel>;
}

@Component({template:''})
export abstract class TableViewComponent<TPageViewModel extends PageViewModel> extends PaginatedChildComponent implements ITableViewComponent<TPageViewModel> {

  private math = Math;

  public pageViewModel$!: BehaviorSubject<TPageViewModel>;

  public selectedDisplayAmount: number = 0;

  public SORT_KEY: string = '';
  public SORT_DIRECTION: string = '';

  constructor(protected override _dev: DeveloperModeHelper) {
    super(_dev);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public setCustomDisplayParameters(viewData_: TableViewData) {
    debugger;
    this.PAGE_SIZE = viewData_.size ? viewData_.size : this.PAGE_SIZE;

    this.selectedDisplayAmount = this.PAGE_SIZE;

    this.CURRENT_PAGE = viewData_.page ? viewData_.page : this.CURRENT_PAGE;

    let sortKey = viewData_.sort.split('|')[0];
    let sortDirection = viewData_.sort.split('|')[1];

    this.SORT_KEY = sortKey;
    this.SORT_DIRECTION = sortDirection;
    //debugger;

  }

  public buildShowingResultModel(): ShowingResultModel {

    // 18-11-2021 - https://stackoverflow.com/questions/54889941/how-to-use-math-min-or-math-max-syntax-in-angular-template

    //<p>Showing {{(page-1) * pageSize}}
    // to
    // {{ math.min((page-1) * pageSize + pageSize, tasks.length)}}
    // of {{tasks.length}}</p>.

    return new ShowingResultModel(
      (((this.PAGE_SIZE * (this.CURRENT_PAGE)) - this.PAGE_SIZE) + 1),
      this.math.min((this.PAGE_SIZE * (this.CURRENT_PAGE)), this.COUNT),
      this.COUNT)
  }

  /**
 * NGX PAGINATION
 * @param $event Page Number
 */

  ngxOnPageChange($event: any) {
    // this.page$.next($event);
    // this.router.navigate(['/search'], { queryParams: { page: $event }, queryParamsHandling: 'merge'});

    this.items$.next({ ...this.items$.getValue(), ...{ page: $event } });
  }

  /** ENDOF NGX PAGINATION */


  public ngxDisplayAmountOnChange($event: any) {
    console.log($event);

    // 18-11-2021 - We might not need this Public Property.
    this.selectedDisplayAmount = $event.value;

    this.items$.next({ ...this.items$.getValue(), ...{ size: $event.value } });

  }

  @ViewChildren(NgbdSortableHeader)
  headers!: QueryList<NgbdSortableHeader>;

  ngxOnSort({ column, direction }: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    var sortKey = column;
    var sortDirection = direction;

    this.items$.next({ ...this.items$.getValue(), ...{ sort: `${sortKey}|${sortDirection}` } });

  }
}
