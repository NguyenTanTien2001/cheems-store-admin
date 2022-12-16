import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ChildViewManagement } from 'src/app/components/framework/child-view.management';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { Filters } from '../../_models/filters.model';
import { CategoriesManagementFilterHeaderPageViewModel } from './_models/categories-management-filter-header-page-view.model';

@Component({
  selector: 'app-categories-management-filter-header',
  templateUrl: './categories-management-filter-header.component.html',
  styleUrls: ['./categories-management-filter-header.component.scss']
})
export class CategoriesManagementFilterHeaderComponent extends ChildViewManagement implements OnInit {
  public pageViewModel$!: BehaviorSubject<CategoriesManagementFilterHeaderPageViewModel>;
  public appForm!: FormGroup;

  constructor(protected override _dev: DeveloperModeHelper) {
    super(_dev);
    this.pageViewModel$ = new BehaviorSubject<CategoriesManagementFilterHeaderPageViewModel>(
      new CategoriesManagementFilterHeaderPageViewModel()
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.appForm = this.appCreateFormGroup();

    const onInit$ = combineLatest([this.items$]);

    const onInit = onInit$.subscribe(([viewData]) => {
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        filters$: (viewData as CategoriesManagementFilterHeaderPageViewModel).filters$,
      });
    });

    this.subscriptions$.push(onInit);
  }

  public ngxAppOnSubmit(): void {
    if (this.appForm.valid) {
      this.pageViewModel$.getValue().filters$.next({
        keyword: this.appForm.getRawValue().filterText,
      } as Filters);
    }
  }

  private appCreateFormGroup(): FormGroup {
    return new FormGroup({
      filterText: new FormControl(undefined),
    });
  }

  public onReload() {
    this.pageViewModel$.getValue().filters$.next({
      ...this.pageViewModel$.getValue().filters$.getValue()
    })
  }

}
