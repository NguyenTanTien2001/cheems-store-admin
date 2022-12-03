import { PageViewModel } from "../../_page/pageview.model";
import { ComponentMode } from "../component-mode.enum";


export class FormViewPageViewModel extends PageViewModel {
  constructor(
    public override componentMode: ComponentMode = ComponentMode.CreateMode,
  ) {
    super(componentMode);
  }
}

