export class Filters {
  constructor(
    public keyword: string,
    public page: number = 1,
    public size: number = 5
  ) {
  }
}
