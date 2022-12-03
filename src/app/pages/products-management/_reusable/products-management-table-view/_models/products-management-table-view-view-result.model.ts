import { ProductType } from "src/app/data/models/product-type.model";

export class ProductsManagementTableViewResult {
    constructor(
        public allProducts: ProductType[] = [],
        public count: number = 0,
    ) { }
}
