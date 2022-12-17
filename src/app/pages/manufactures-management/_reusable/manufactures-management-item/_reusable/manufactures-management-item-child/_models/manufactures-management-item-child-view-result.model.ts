import { Manufacture } from "src/app/data/models/manufacture.model";

export class ManufacturesManagementItemChildViewResult {
    constructor(
        public manufactureResult: Manufacture = new Manufacture,
    ) { }
}
