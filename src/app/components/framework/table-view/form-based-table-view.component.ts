import { AbstractControl, FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { GraphQLTableViewComponent, IGraphQLTableViewComponent } from "./graphql-table-view.component";
import { BehaviorSubject } from "rxjs";
import { FormBasedTablePageViewModel } from "../_page/_tables/formbased-page-view.model";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { BasicTableBodyFormControl } from "../form-view/_form-controls/basic-table.form-control";
import { Component } from "@angular/core";

declare let mApp: any;

export interface IFormBasedTableViewComponent<TPageViewModel extends FormBasedTablePageViewModel> extends IGraphQLTableViewComponent<TPageViewModel> {

  prepareFormBodyControls(results : any[]) : FormGroup[];

  scaffoldFormControl(anyResult : any, selectIdx: boolean) : BasicTableBodyFormControl;
}

@Component({template:''})
export abstract class FormBasedTableViewComponent<TPageViewModel extends FormBasedTablePageViewModel> extends GraphQLTableViewComponent<TPageViewModel> implements IFormBasedTableViewComponent<TPageViewModel> {

  public appForm: FormGroup;

  public readonly IDX : string = "idxSelected";

  formHeader() : FormGroup {
    return this.appForm.get('formHeader') as FormGroup
  }

  formBody() : FormArray {
    return this.appForm.get('formBody') as FormArray;
  }

  formBodyAtIdx(idx: number) {
    return this.formBody().controls[idx];
  }

  private formBodyIdx$ : BehaviorSubject<boolean>;

  constructor(public override _formBuilder: FormBuilder, protected override _dev: DeveloperModeHelper) {
    super(_formBuilder, _dev);

    this.appForm = this.appCreateFormGroup({}, []);

    this.formBodyIdx$ = new BehaviorSubject<boolean>(false);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.formBodyIdx$.subscribe((idxBool: boolean) => {
      this.items$.next({ ...this.items$.getValue(), ...{ selectIdx: idxBool } });
    });

  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public appCreateFormGroup(headerControls: { [key: string]: AbstractControl  },
    bodyControls : FormGroup[]

    ): FormGroup {

    var selectIdx = false;

    if(!!this.pageViewModel$) {
      selectIdx = !!this.pageViewModel$.getValue().selectIdx;
    }


    var appFormGroup = this._formBuilder.group({
      formHeader: this._formBuilder.group({
        idxSelected: this._formBuilder.control(selectIdx),
        // ...headerControls
      }),
      formBody: this._formBuilder.array(bodyControls)
    });

    var _idx = appFormGroup.get('formHeader')?.get(this.IDX);

    //debugger;

    _idx?.valueChanges.subscribe((idxBool : boolean) => {
      //debugger;
      this.formBodyIdx$.next(idxBool);
    });

    return appFormGroup;
  }

  abstract prepareFormBodyControls(results : any[]) : FormGroup[];

  abstract scaffoldFormControl(anyResult : any, selectIdx: boolean) : BasicTableBodyFormControl;
}
