import { PageViewModel } from "../pageview.model";
import { SearchSort } from "./search-sort.model";
import { ShowingResultModel } from "./showing-result.model";
import { TableDisplayAmount } from "./table-display-amount.model";


export class TablePageViewModel extends PageViewModel {
  constructor(
    public tableDisplayInformation: ShowingResultModel = new ShowingResultModel,
    public pageSort: SearchSort = new SearchSort([
      // { title : "Most Recent", id: null },
      // { title : "Price Low to High", id: "price|ASC" },
      // { title : "Price High to Low", id: "price|DESC" },
      // { title : "Area Low to High", id: "totalarea|ASC" },
      // { title : "Area High to Low", id: "totalarea|DESC" },
      // { title : "Beds Low to High", id: "beds|ASC" },
      // { title : "Beds High to Low", id: "beds|DESC" },
    ]),

    public tableDisplayAmount: TableDisplayAmount = new TableDisplayAmount([
      { title: "2", value: 2 },
      { title: "5", value: 5 },
      { title: "10", value: 10 },
      { title: "15", value: 15 },
    ]),
    public selectedDisplayAmount: number = 2,
    public paginationIdx : string = '',
  ) {
    super();
  }
}

