import { ProductsManagementItemChildComponent } from "./products-management-item-child.component";

export class ProductsManagementItemChildValidation {

  constructor(
    private _productsManagementItemChildComponent: ProductsManagementItemChildComponent
  ) {}

  // the project input fields
  input = {
    NAME: 'name',
    DESCRIPTION: 'description',
    PRICE: 'price',
    CATEGORY_ID: 'categoryId',
    WARRENTY_DATE: 'warrentyDate',
    METADATA: 'metaData',
    MANUFACTURE: 'manufacturersId'
  };

  // name
  get name() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.NAME);
  }
  get isNameInvalid() {
    return this.name?.invalid;
  }

  // description
  get description() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.DESCRIPTION);
  }
  get isDescriptionInvalid() {
    return this.description?.invalid;
  }

  // price
  get price() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.PRICE);
  }
  get isPriceInvalid() {
    return this.price?.invalid;
  }

  // categoryId
  get categoryId() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.CATEGORY_ID);
  }
  get isCategoryIdInvalid() {
    return this.categoryId?.invalid;
  }

  // warrentyDate
  get warrentyDate() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.WARRENTY_DATE);
  }
  get isWarrentyDateInvalid() {
    return this.warrentyDate?.invalid;
  }

  // metaData
  get metaData() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.METADATA);
  }
  get isMetaDataInvalid() {
    return this.metaData?.invalid;
  }

  // Manufacture
  get manufacture() {
    return this._productsManagementItemChildComponent.formBody().get(this.input.MANUFACTURE);
  }
  get isManufactureInvalid() {
    return this.manufacture?.invalid;
  }

  // summit button
  get isSummitInvalid() {
    return this.isNameInvalid || this.isDescriptionInvalid || this.isPriceInvalid || this.isCategoryIdInvalid || this.isWarrentyDateInvalid || this.isMetaDataInvalid || this.isManufactureInvalid;
  }
}

