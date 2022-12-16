import { FormViewPageViewModel } from 'src/app/components/framework/form-view/_models/form-view-page-view-model.model';
import { Category } from 'src/app/data/models/category.model';
import { Manufacture } from 'src/app/data/models/manufacture.model';
import { Media } from 'src/app/data/models/media.model';

export class ProductsManagementItemChildPageViewModel extends FormViewPageViewModel {
    constructor(

        public isCreateMode: boolean = false,
        public productTypeIdentifier: string = '',
        public categoriesDropdown: Category[] = [],
        public manufacturesDropdown: Manufacture[] = [],
        public photos: any = [],
        public progressPhoto: number = 0,
        public isErrorPhoto: boolean = false,

    ) {
        super();
    }
}
