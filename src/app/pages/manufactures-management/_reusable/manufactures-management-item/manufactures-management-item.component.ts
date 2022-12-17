import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, switchMap } from 'rxjs';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { PageViewModelBasedComponent } from 'src/app/components/framework/form-view/page-view-model-based-component';
import { ManufacturesManagementItemPageViewModel } from './_models/manufactures-management-item-page-view.model';
import { ManufacturesManagementItemChildViewData } from './_reusable/manufactures-management-item-child/_models/manufactures-management-item-child-view-data.model';

@Component({
  selector: 'app-manufactures-management-item',
  templateUrl: './manufactures-management-item.component.html',
  styleUrls: ['./manufactures-management-item.component.scss']
})
export class ManufacturesManagementItemComponent extends PageViewModelBasedComponent<ManufacturesManagementItemPageViewModel> implements OnInit {
  public manufacturesManagementItemChildViewData$: BehaviorSubject<ManufacturesManagementItemChildViewData>;

  public componentMode = ComponentMode.CreateMode;

  constructor(
    private activatedRoute: ActivatedRoute,
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject(
      new ManufacturesManagementItemPageViewModel(ComponentMode.CreateMode)
    );

    this.manufacturesManagementItemChildViewData$ = new BehaviorSubject<ManufacturesManagementItemChildViewData>(new ManufacturesManagementItemChildViewData);
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

      this.manufacturesManagementItemChildViewData$.next(new ManufacturesManagementItemChildViewData(identifier));
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
