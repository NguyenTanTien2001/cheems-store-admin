import { GraphQLFormBasedTablePageViewModel } from "src/app/components/framework/table-view/_models/graphqlformbasedtable-page-view.model";
import { SearchSort } from "src/app/components/framework/_page/_tables/search-sort.model";
import { ShowingResultModel } from "src/app/components/framework/_page/_tables/showing-result.model";
import { TableDisplayAmount } from "src/app/components/framework/_page/_tables/table-display-amount.model";
import { ManufacturesManagementTableViewResult } from "./manufactures-management-table-view-view-result.model";

export class ManufacturesManagementTableViewPageViewModel extends GraphQLFormBasedTablePageViewModel {
  constructor(
    public tableViewResult: ManufacturesManagementTableViewResult = new ManufacturesManagementTableViewResult,
    public override tableDisplayInformation: ShowingResultModel = new ShowingResultModel,
    public override pageSort: SearchSort = new SearchSort([
        { title : 'Most Recent', id: '' },
    ]),

    public override tableDisplayAmount: TableDisplayAmount = new TableDisplayAmount([
        { title: '2', value: 2 },
        { title: '5', value: 5 },
        { title: '10', value: 10 },
        { title: '15', value: 15 },
    ]),

    public override selectedDisplayAmount: number = 2,
    public override selectIdx: boolean = false,
    public override paginationIdx: string = '',
) {
    super(tableDisplayInformation, pageSort, tableDisplayAmount, selectedDisplayAmount, selectIdx, paginationIdx)
}
}
