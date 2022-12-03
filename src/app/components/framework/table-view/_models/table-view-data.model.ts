
import { ViewData } from "../../_page/viewdata.model";

export class TableViewData extends ViewData{
    constructor(
      public page: number = 1,
      public size: number = 10,
      public sort: string = "|",
    ) {
      super()
    }
  }
