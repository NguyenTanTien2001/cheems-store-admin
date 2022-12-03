import { FormBasedTablePageViewModel } from "../../_page/_tables/formbased-page-view.model";
import { SearchSort } from "../../_page/_tables/search-sort.model";
import { ShowingResultModel } from "../../_page/_tables/showing-result.model";
import { TableDisplayAmount } from "../../_page/_tables/table-display-amount.model";

export class GraphQLFormBasedTablePageViewModel extends FormBasedTablePageViewModel {
  constructor(
    public override tableDisplayInformation: ShowingResultModel = new ShowingResultModel,
    public override pageSort: SearchSort = new SearchSort([]),
    public override tableDisplayAmount: TableDisplayAmount = new TableDisplayAmount([
      { title: "2", value: 2 },
      { title: "5", value: 5 },
      { title: "10", value: 10 },
      { title: "15", value: 15 },
    ]),
    public override selectedDisplayAmount: number = 2,
    public override selectIdx: boolean = false,
    public override paginationIdx : string = '',
  ) {

    super(tableDisplayInformation, pageSort, tableDisplayAmount, selectedDisplayAmount, selectIdx, paginationIdx)
  }
}
