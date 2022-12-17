import { FormControl } from '@angular/forms';
import { BasicTableBodyFormControl } from 'src/app/components/framework/form-view/_form-controls/basic-table.form-control';

export class  ManufacturesManagementFormControl extends BasicTableBodyFormControl {
  constructor(
    public override idxSelected: FormControl = new FormControl(false),
    public id: FormControl = new FormControl(''),
    public name: FormControl = new FormControl(''),
    public description: FormControl = new FormControl(''),
  ) {
    super(idxSelected);
  }
}

