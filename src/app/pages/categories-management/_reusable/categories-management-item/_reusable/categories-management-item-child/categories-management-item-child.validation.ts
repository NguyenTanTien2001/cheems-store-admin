import { CategoriesManagementItemChildComponent } from "./categories-management-item-child.component";

export class CategoriesManagementItemChildValidation {

  constructor(
    private _productsManagementItemChildComponent: CategoriesManagementItemChildComponent
  ) {}

  // the project input fields
  input = {
    NAME: 'name',
    DESCRIPTION: 'description',
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

  // summit button
  get isSummitInvalid() {
    return this.isNameInvalid || this.isDescriptionInvalid;
  }
}

