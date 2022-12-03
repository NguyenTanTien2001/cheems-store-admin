import { FormViewData } from "src/app/components/framework/form-view/_models/form-view-data.model";

export class ProductsManagementItemChildViewData extends FormViewData {

  constructor(
    public  productTypeIdentifier: string = ''
    ) {
    super();
  }
}
