import { ComponentMode } from "src/app/components/framework/form-view/component-mode.enum";
import { PageViewModel } from "src/app/components/framework/_page/pageview.model";

export class CategoriesManagementItemPageViewModel extends PageViewModel {
    constructor(
        public override componentMode: ComponentMode = ComponentMode.CreateMode,
        public categoryIdentifier: string = ''
    ) {
        super(componentMode);
    }
}
