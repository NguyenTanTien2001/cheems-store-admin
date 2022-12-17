import { FormBasedTableViewData } from "src/app/components/framework/table-view/_models/form-based-table-view-data.model";


export class ManufacturesManagementTableViewViewData extends FormBasedTableViewData  {
  constructor(
    public keyword: string = '',
    public override page: number = 0
    ) {
    super();
  }
}
