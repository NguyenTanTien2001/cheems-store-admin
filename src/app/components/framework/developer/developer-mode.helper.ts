import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { DeveloperConstants } from "./developer-constants";
@Injectable({
  providedIn: 'root',
})
export class DeveloperModeHelper {
  public isDeveloper: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isDeveloperModeEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); //JSON.parse(localStorage.getItem(DeveloperConstants.IS_DEVELOPER_MODE)));
  constructor() {
  }
  next(val: boolean) {
    localStorage.setItem(DeveloperConstants.IS_DEVELOPER_MODE, JSON.stringify(val));
    this.isDeveloperModeEnabled.next(val);
  }
}
