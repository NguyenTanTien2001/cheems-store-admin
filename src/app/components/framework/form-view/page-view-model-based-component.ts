import { FormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { IBaseChildViewManagement } from "../base-child-view.interface";
import { ChildViewManagement } from "../child-view.management";
import { ComponentMode } from "./component-mode.enum";
import { PageViewModel } from "../_page/pageview.model";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { Component } from "@angular/core";

declare let mApp: any;

export interface IPageViewModelBasedComponent<TPageViewModel extends PageViewModel> extends IBaseChildViewManagement {
  pageViewModel$: BehaviorSubject<TPageViewModel>;
}

@Component({template:''})
export abstract class PageViewModelBasedComponent<TPageViewModel extends PageViewModel> extends ChildViewManagement implements IPageViewModelBasedComponent<TPageViewModel> {

  public COMPONENT_MODE!: ComponentMode;

  public pageViewModel$!: BehaviorSubject<TPageViewModel>;

  constructor(
    public _formBuilder: FormBuilder,
    protected override _dev: DeveloperModeHelper
    ) {
    super(_dev);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
