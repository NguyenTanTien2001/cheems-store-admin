import { TableViewData } from "./table-view-data.model";


export class FormBasedTableViewData extends TableViewData {
  constructor(
    public override page: number = 1,
    public override size: number = 10,
    public override sort: string = "|",
    public selectIdx: boolean = false
  ) {
    super(page, size, sort);
  }
}

