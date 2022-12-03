import { AbstractControl, FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { FormViewPageViewModel } from "./_models/form-view-page-view-model.model";
import { BasicFormViewFormControls } from "./_form-controls/basic-form-view.form-control";
import { IPageViewModelBasedComponent, PageViewModelBasedComponent } from "./page-view-model-based-component";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { Component } from "@angular/core";

declare let mApp: any;

export interface IFormViewComponent<TPageViewModel extends FormViewPageViewModel> extends IPageViewModelBasedComponent<TPageViewModel> {
  prepareFormBodyControls(results : any) : FormGroup;

  scaffoldFormControl(anyResult : any, selectIdx: boolean) : BasicFormViewFormControls;

  ngxOnSubmit(): void;
}

@Component({template:''})
export abstract class FormViewComponent<TPageViewModel extends FormViewPageViewModel> extends PageViewModelBasedComponent<TPageViewModel> implements IFormViewComponent<TPageViewModel> {

  public appForm: FormGroup;

  formBody() : FormArray {
    return this.appForm.get('formBody') as FormArray;
  }

  constructor(public override _formBuilder: FormBuilder , _dev: DeveloperModeHelper) {
    super(_formBuilder, _dev);

    this.appForm = this.appCreateFormGroup({}, this._formBuilder.group({}));
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public appCreateFormGroup(headerControls: { [key: string]: AbstractControl  },
    bodyControls : FormGroup

    ): FormGroup {

    var appFormGroup = this._formBuilder.group({
      formBody: bodyControls
    });

    return appFormGroup;
  }

  abstract ngxOnSubmit(): void;

  abstract prepareFormBodyControls(results : any) : FormGroup;

  abstract scaffoldFormControl(anyResult : any, selectIdx: boolean) : BasicFormViewFormControls;
}
