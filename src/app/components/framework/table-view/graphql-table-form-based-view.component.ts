import { QueryRef } from "apollo-angular";
import { FormBuilder } from "@angular/forms";
import { FormBasedTableViewComponent, IFormBasedTableViewComponent } from "./form-based-table-view.component";
import { GraphQLFormBasedTablePageViewModel } from "./_models/graphqlformbasedtable-page-view.model";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { Component } from "@angular/core";

declare let mApp: any;

export interface IGraphQLFormBasedTableViewComponent<TPageViewModel extends GraphQLFormBasedTablePageViewModel> extends IFormBasedTableViewComponent<TPageViewModel> {
}

@Component({template:''})
export abstract class GraphQLFormBasedTableViewComponent<TPageViewModel extends GraphQLFormBasedTablePageViewModel> extends FormBasedTableViewComponent<TPageViewModel> implements IGraphQLFormBasedTableViewComponent<TPageViewModel> {


  /**
 * Private Variables - DEFN
 */
  public override _appQueryInstance!: QueryRef<{}, {}>;

  constructor(public override _formBuilder: FormBuilder, protected override _dev: DeveloperModeHelper) {
    super(_formBuilder, _dev);
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


  public override __MUT_VARS(page: number, size: number, sortKey: string, sortDirection: string) {
    return {
      filters: {
        size: size,
        page: page,
        sortKey: sortKey,
        sortDirection: sortDirection
      }
    }
  }
}
