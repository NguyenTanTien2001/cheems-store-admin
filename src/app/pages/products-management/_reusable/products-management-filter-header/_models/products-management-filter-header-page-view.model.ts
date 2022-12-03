import { BehaviorSubject } from "rxjs";
import { PageViewModel } from "src/app/components/framework/_page/pageview.model";
import { Filters } from "../../../_models/filters.model";

export class ProductsManagementFilterHeaderPageViewModel extends PageViewModel {
  constructor(
    public filters$: BehaviorSubject<Filters> = new BehaviorSubject(new Filters(''))
    ) {
    super();
  }
}
