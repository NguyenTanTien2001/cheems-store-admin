import productpageMock from "../_mocks/products-page-mock.json"
import { Category } from "./category.model";

export class ProductType {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public price: string = '',
    public categories: Category[] = [],
    public warrentyDate: string = '',
    public metaData: string = ''
  ) {}
}
