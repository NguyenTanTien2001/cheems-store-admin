import { ITableViewComponent, TableViewComponent } from "./table-view.component";
import { QueryRef } from "apollo-angular";
import { FormBuilder } from "@angular/forms";
import { PageViewModel } from "../_page/pageview.model";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { Component } from "@angular/core";

declare let mApp: any;

export interface IGraphQLTableViewComponent<TPageViewModel extends PageViewModel> extends ITableViewComponent<TPageViewModel> {
}

@Component({template:''})
export abstract class GraphQLTableViewComponent<TPageViewModel extends PageViewModel> extends TableViewComponent<TPageViewModel> implements IGraphQLTableViewComponent<TPageViewModel> {


  /**
 * Private Variables - DEFN
 */
  public _appQueryInstance!: QueryRef<{}, {}>;

  constructor(public _formBuilder: FormBuilder, protected override _dev: DeveloperModeHelper) {
    super(_dev);
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


  public __MUT_VARS(page: number, size: number, sortKey: string, sortDirection: string) {
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
