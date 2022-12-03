import { ComponentMode } from "../form-view/component-mode.enum";

export class PageViewModel {
  constructor(public componentMode: ComponentMode = ComponentMode.CreateMode) {
  }
}
