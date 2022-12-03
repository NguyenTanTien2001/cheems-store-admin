import { Component } from "@angular/core";
import { Subscription } from "rxjs";

export interface ILifetimeManagement {
  subscriptions$: Subscription[];
}

@Component({template:''})
export abstract class LifetimeManagement implements ILifetimeManagement {
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions$.map(elem => {
      if (elem) {
        elem.unsubscribe();
      }
    });
  }

  private __subscriptions: Subscription[] = [];

  get subscriptions$(): Subscription[] {
    return this.__subscriptions;
  }

  constructor() { }

}
