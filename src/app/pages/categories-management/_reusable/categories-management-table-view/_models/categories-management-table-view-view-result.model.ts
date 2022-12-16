import { Category } from "src/app/data/models/category.model";

export class CategoriesManagementTableViewResult {
    constructor(
        public allCategories: Category[] = [],
        public count: number = 0,
    ) { }
}
