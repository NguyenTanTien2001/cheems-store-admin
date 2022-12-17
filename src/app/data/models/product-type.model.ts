import productpageMock from "../_mocks/products-page-mock.json"
import { Category } from "./category.model";
import { Manufacture } from "./manufacture.model";
import { Media } from "./media.model";

export class ProductType {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public price: number = 0,
    public categories: Category[] = [],
    public warrentyDate: string = '',
    public metaDatas: MetaData[] = [],
    public medias: Media[] = [],
  ) {}
}

export class MetaData {
  constructor(
    public id: string = '',
		public audio: string = '',
		public battery: string = '',
		public camera: string = '',
		public color: string = '',
		public cPUSeries: string = '',
		public dimensions: string = '',
		public gPUSeries: string = '',
		public hardDrive: string = '',
		public manufacturersId: string = '',
		public manufacturers: Manufacture = new Manufacture,
		public operatingSystem: string = '',
		public ports: string = '',
		public publishedDate: string = '',
		public ram: string = '',
		public screenResolution: string = '',
		public seriesName: string = '',
		public weight: string = '',
		public wLAN: string = ''
  ) {}
}
