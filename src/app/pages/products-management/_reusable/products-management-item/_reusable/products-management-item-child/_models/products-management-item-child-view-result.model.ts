import { ProductType } from "src/app/data/models/product-type.model";

export class ProductsManagementItemChildViewResult {
    constructor(
        public productTypeResult: ProductType = new ProductType,
    ) { }
}
