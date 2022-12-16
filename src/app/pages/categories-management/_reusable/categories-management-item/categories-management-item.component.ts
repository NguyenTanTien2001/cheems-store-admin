import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { PageViewModelBasedComponent } from 'src/app/components/framework/form-view/page-view-model-based-component';
import { CategoriesManagementItemPageViewModel } from './_models/categories-management-item-page-view.model';
import { CategoriesManagementItemChildViewData } from './_reusable/categories-management-item-child/_models/categories-management-item-child-view-data.model';

@Component({
  selector: 'app-categories-management-item',
  templateUrl: './categories-management-item.component.html',
  styleUrls: ['./categories-management-item.component.scss']
})
export class CategoriesManagementItemComponent extends PageViewModelBasedComponent<CategoriesManagementItemPageViewModel> implements OnInit {
  public categoriesManagementItemChildViewData$: BehaviorSubject<CategoriesManagementItemChildViewData>;

  public componentMode = ComponentMode.CreateMode;

  constructor(
    private activatedRoute: ActivatedRoute,
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject(
      new CategoriesManagementItemPageViewModel(ComponentMode.CreateMode)
    );

    this.categoriesManagementItemChildViewData$ = new BehaviorSubject<CategoriesManagementItemChildViewData>(new CategoriesManagementItemChildViewData);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    const onInit$ = combineLatest(
      [this.appRouteParams$(),
      this.appRouteQueryParams$()]
    ).pipe(
    switchMap(([RouteParams, QueryParams]) => {
          let identifier$ = '';

          if (RouteParams['identifier']) {
            identifier$ = RouteParams['identifier'];
          }
          return of(identifier$);
        })
    );

    const piped$ = onInit$;

    const onInit = piped$.subscribe((identifier: string) => {
      let viewMode = ComponentMode.CreateMode;
      this.componentMode = ComponentMode.CreateMode;

      if (identifier !== '') {
        viewMode = ComponentMode.EditMode;
        this.componentMode = ComponentMode.EditMode;
      }

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
          componentMode: viewMode,
        },
      });

      this.categoriesManagementItemChildViewData$.next(new CategoriesManagementItemChildViewData(identifier));
    });

    this.subscriptions$.push(onInit);

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  appRouteParams$(): Observable<Params> {
    const params$ = this.activatedRoute.params;
    return params$;
  }

  appRouteQueryParams$(): Observable<Params> {
    const queryParams$ = this.activatedRoute.queryParams;
    return queryParams$;
  }

  setTitle(): string {
    if(this.componentMode === ComponentMode.CreateMode){
      return 'category management - Create';
    } else {
      return 'category management - Edit';
    }
  }

}
