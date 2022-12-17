import { FormViewData } from "src/app/components/framework/form-view/_models/form-view-data.model";

export class ManufacturesManagementItemChildViewData extends FormViewData {

  constructor(
    public  manufactureIdentifier: string = ''
    ) {
    super();
  }
}
