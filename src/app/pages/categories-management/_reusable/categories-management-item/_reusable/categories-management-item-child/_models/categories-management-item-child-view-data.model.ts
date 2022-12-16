import { FormViewData } from "src/app/components/framework/form-view/_models/form-view-data.model";

export class CategoriesManagementItemChildViewData extends FormViewData {

  constructor(
    public  categoryIdentifier: string = ''
    ) {
    super();
  }
}
