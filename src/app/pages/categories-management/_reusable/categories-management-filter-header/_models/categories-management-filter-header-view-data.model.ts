import { BehaviorSubject } from "rxjs";
import { ViewData } from "src/app/components/framework/_page/viewdata.model";
import { Filters } from "../../../_models/filters.model";


export class CategoriesManagementFilterHeaderViewData extends ViewData {
  constructor(
    public filters$: BehaviorSubject<Filters> = new BehaviorSubject(new Filters(''))
  ) {
    super();
  }
}
