import { ManufacturesManagementItemChildComponent } from "./manufactures-management-item-child.component";

export class ManufacturesManagementItemChildValidation {

  constructor(
    private _manufactureManagementItemChildComponent: ManufacturesManagementItemChildComponent
  ) {}

  // the project input fields
  input = {
    NAME: 'name',
    DESCRIPTION: 'description',
  };

  // name
  get name() {
    return this._manufactureManagementItemChildComponent.formBody().get(this.input.NAME);
  }
  get isNameInvalid() {
    return this.name?.invalid;
  }

  // description
  get description() {
    return this._manufactureManagementItemChildComponent.formBody().get(this.input.DESCRIPTION);
  }
  get isDescriptionInvalid() {
    return this.description?.invalid;
  }

  // summit button
  get isSummitInvalid() {
    return this.isNameInvalid || this.isDescriptionInvalid;
  }
}

