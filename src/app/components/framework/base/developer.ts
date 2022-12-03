import { Subscription } from "rxjs";
import { LifetimeManagement } from "./lifetime-management";
import { DeveloperModeHelper } from "../developer/developer-mode.helper";
import { Component } from "@angular/core";

export interface IDeveloper {

  // Property / Field
  showDeveloperLabel : boolean;
  showDeveloperModeLabel : boolean;

  // Getter
  isDeveloperModeEnabled : boolean;

  isDeveloper$ : Subscription;
  developerMode$ : Subscription;
}

@Component({template:''})
export abstract class Developer extends LifetimeManagement implements IDeveloper {
  constructor(protected developer: DeveloperModeHelper) {
    super();
   };

  isDeveloper$! : Subscription;
  developerMode$! : Subscription;

  override ngOnInit(): void {
    super.ngOnInit();

    this.isDeveloper$ = this.developer.isDeveloper.subscribe((isDeveloper) => {

      this.showDeveloperLabel = isDeveloper;
    });

    this.subscriptions$.push(this.isDeveloper$);

    this.developerMode$ = this.developer.isDeveloperModeEnabled.subscribe((isDeveloperModeEnabled) => {

      this.showDeveloperModeLabel = isDeveloperModeEnabled;
    });

    this.subscriptions$.push(this.developerMode$);
  }
  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  public showDeveloperLabel = false;
  public showDeveloperModeLabel = false;

  get isDeveloperModeEnabled() {
    return this.showDeveloperLabel && this.showDeveloperModeLabel;
  }

}

