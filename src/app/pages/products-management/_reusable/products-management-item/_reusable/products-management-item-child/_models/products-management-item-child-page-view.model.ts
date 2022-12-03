import { FormViewPageViewModel } from 'src/app/components/framework/form-view/_models/form-view-page-view-model.model';
import { Category } from 'src/app/data/models/category.model';

export class ProductsManagementItemChildPageViewModel extends FormViewPageViewModel {
    constructor(

        public isCreateMode: boolean = false,
        public productTypeIdentifier: string = '',
        public categoriesDropdown: Category[] = [],

    ) {
        super();
    }
}
