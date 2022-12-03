import { FormControl } from '@angular/forms';
import { BasicFormViewFormControls } from 'src/app/components/framework/form-view/_form-controls/basic-form-view.form-control';

export class  ProductsManagementItemChildFormControl extends BasicFormViewFormControls  {
  constructor(
    public override id: FormControl = new FormControl(''),
    public name: FormControl = new FormControl(''),
    public description: FormControl = new FormControl(''),
    public price: FormControl = new FormControl(''),
    public category: FormControl = new FormControl(''),
    public warrentyDate: FormControl = new FormControl(''),
    public metaData: FormControl = new FormControl(''),
    public deletedAt: FormControl = new FormControl(''),
  ) {
    super();
  }
}
