import { FormControl } from '@angular/forms';
import { BasicFormViewFormControls } from 'src/app/components/framework/form-view/_form-controls/basic-form-view.form-control';

export class  CategoriesManagementItemChildFormControl extends BasicFormViewFormControls  {
  constructor(
    public override id: FormControl = new FormControl(''),
    public name: FormControl = new FormControl(''),
    public description: FormControl = new FormControl('')
  ) {
    super();
  }
}
