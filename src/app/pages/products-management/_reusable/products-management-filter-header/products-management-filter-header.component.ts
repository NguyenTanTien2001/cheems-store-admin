import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { ChildViewManagement } from 'src/app/components/framework/child-view.management';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { Filters } from '../../_models/filters.model';
import { ProductsManagementFilterHeaderPageViewModel } from './_models/products-management-filter-header-page-view.model';

@Component({
  selector: 'app-products-management-filter-header',
  templateUrl: './products-management-filter-header.component.html',
  styleUrls: ['./products-management-filter-header.component.scss']
})
export class ProductsManagementFilterHeaderComponent extends ChildViewManagement implements OnInit {
  public pageViewModel$!: BehaviorSubject<ProductsManagementFilterHeaderPageViewModel>;
  public appForm!: FormGroup;

  constructor(protected override _dev: DeveloperModeHelper) {
    super(_dev);
    this.pageViewModel$ = new BehaviorSubject<ProductsManagementFilterHeaderPageViewModel>(
      new ProductsManagementFilterHeaderPageViewModel()
    );
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.appForm = this.appCreateFormGroup();

    const onInit$ = combineLatest([this.items$]);

    const onInit = onInit$.subscribe(([viewData]) => {
      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        filters$: (viewData as ProductsManagementFilterHeaderPageViewModel).filters$,
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

}
