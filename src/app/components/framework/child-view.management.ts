import { BehaviorSubject } from "rxjs";

import { Component, Input } from "@angular/core";
import { IBaseChildViewManagement } from "./base-child-view.interface";
import { ViewData } from "./_page/viewdata.model";
import { Developer } from "./base/developer";
import { DeveloperModeHelper } from "./developer/developer-mode.helper";

@Component({template:''})
export class ChildViewManagement extends Developer implements IBaseChildViewManagement {

  constructor(protected _dev: DeveloperModeHelper) {
    super(_dev);
  }
  _items = new BehaviorSubject<ViewData>(new ViewData);

  @Input() set items(value: ViewData) {
    this._items.next(value);
  }

  get items() {
    return this._items.getValue();
  }

  get items$() {
    return this._items;
  }

  override ngOnInit() : void {
    super.ngOnInit();
  }

  override ngOnDestroy() : void {
    super.ngOnDestroy();
  }
}
