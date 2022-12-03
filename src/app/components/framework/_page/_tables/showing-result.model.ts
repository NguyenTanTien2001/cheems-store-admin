export class ShowingResultModel {
  constructor(
      // Arrays are initialised as empty arrays and not null.
      public fromIdx: number = 0,
      public toIdx: number = 0,
      public totalItems: number = 0
  ) { }
}
