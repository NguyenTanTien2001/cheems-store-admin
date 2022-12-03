import { BehaviorSubject } from "rxjs";
import { ViewData } from "./_page/viewdata.model";

export interface IBaseChildViewManagement {
  _items: BehaviorSubject<ViewData>;
}
