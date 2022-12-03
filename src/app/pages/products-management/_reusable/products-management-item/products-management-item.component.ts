import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { PageViewModelBasedComponent } from 'src/app/components/framework/form-view/page-view-model-based-component';
import { ProductsManagementItemItemViewModel } from './_models/products-management-item-page-view.model';
import { ProductsManagementItemChildViewData } from './_reusable/products-management-item-child/_models/products-management-item-child-view-data.model';

@Component({
  selector: 'app-products-management-item',
  templateUrl: './products-management-item.component.html',
  styleUrls: ['./products-management-item.component.scss']
})
export class ProductsManagementItemComponent extends PageViewModelBasedComponent<ProductsManagementItemItemViewModel> implements OnInit {
  public productsManagementItemChildViewData$: BehaviorSubject<ProductsManagementItemChildViewData>;

  public componentMode = ComponentMode.CreateMode;

  constructor(
    private activatedRoute: ActivatedRoute,
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject(
      new ProductsManagementItemItemViewModel(ComponentMode.CreateMode)
    );

    this.productsManagementItemChildViewData$ = new BehaviorSubject<ProductsManagementItemChildViewData>(new ProductsManagementItemChildViewData);
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

      this.productsManagementItemChildViewData$.next(new ProductsManagementItemChildViewData(identifier));
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
      return 'Product management - Create';
    } else {
      return 'Product management - Edit';
    }
  }

}
