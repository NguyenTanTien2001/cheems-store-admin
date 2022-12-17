import { Manufacture } from "src/app/data/models/manufacture.model";

export class ManufacturesManagementTableViewResult {
    constructor(
        public allManufactures: Manufacture[] = [],
        public count: number = 0,
    ) { }
}
