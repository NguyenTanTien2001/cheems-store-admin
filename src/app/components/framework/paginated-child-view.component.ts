// import { SharedTitleService } from "@app/shared/services/shared-title.service";
import { BehaviorSubject } from "rxjs";
import { ChildViewManagement } from "./child-view.management";
import { IBaseChildViewManagement } from "./base-child-view.interface";
import { Component } from "@angular/core";
// import { DeveloperModeHelper } from "@app/shared/developer-mode.helper";
// import { BaseComponent } from "@app/pages/base/base.component";

declare let mApp: any;

export interface IPaginatedChildComponent {
  PAGE_SIZE: number;
  CURRENT_PAGE: number;
  COUNT: number;
}

@Component({template:''})
export abstract class PaginatedChildComponent extends ChildViewManagement implements IPaginatedChildComponent, IBaseChildViewManagement {

  PAGE_SIZE: number = 12;
  CURRENT_PAGE: number = 1;
  COUNT: number = 0

  _page = new BehaviorSubject<number>(this.CURRENT_PAGE);

  get page$() {
    return this._page;
  }

  override ngOnInit() : void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
