import { Category } from "src/app/data/models/category.model";

export class CategoriesManagementItemChildViewResult {
    constructor(
        public categoryResult: Category = new Category,
    ) { }
}
