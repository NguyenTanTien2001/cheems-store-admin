import { Mutation, QueryRef } from "apollo-angular";
import { FormBuilder } from "@angular/forms";
import { FormViewComponent, IFormViewComponent } from "./form-view.component";
import { PageViewModel } from "../_page/pageview.model";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { Component } from "@angular/core";

declare let mApp: any;

export interface IGraphQLFormViewComponent<TPageViewModel extends PageViewModel> extends IFormViewComponent<TPageViewModel> {
}

@Component({template:''})
export abstract class GraphQLFormViewComponent<TPageViewModel extends PageViewModel> extends FormViewComponent<TPageViewModel> implements IGraphQLFormViewComponent<TPageViewModel> {


  /**
 * Private Variables - DEFN
 */
  public _appMainQueryInstance!: QueryRef<{}, {}>;
  public _appMainMutationInstance!: Mutation;// QueryRef<{}, {}>;

  constructor(formBuilder: FormBuilder  , _dev: DeveloperModeHelper) {
    super(formBuilder, _dev);
  }
  override ngOnInit(): void {
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
 * Helper to create MUT_VATS object
 * @param page Page Number.subs
 * @param size Page Size
 */


  public __MUT_VARS(/*(page: number, size: number, sortKey: string, sortDirection: string*/) {
    return {
      filters: {
        // size: size,
        // page: page,
        // sortKey: sortKey,
        // sortDirection: sortDirection
      }
    }
  }
}
