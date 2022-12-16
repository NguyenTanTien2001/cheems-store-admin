import productpageMock from "../_mocks/products-page-mock.json"

export class Category {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
  ) {}
}

export let categoryTest = productpageMock.data.categories.data as Category[];
