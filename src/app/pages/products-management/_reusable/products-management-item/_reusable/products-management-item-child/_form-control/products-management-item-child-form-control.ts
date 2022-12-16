import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { BasicFormViewFormControls } from 'src/app/components/framework/form-view/_form-controls/basic-form-view.form-control';

export class  ProductsManagementItemChildFormControl extends BasicFormViewFormControls  {
  constructor(
    public override id: FormControl = new FormControl(''),
    public name: FormControl = new FormControl(''),
    public description: FormControl = new FormControl(''),
    public price: FormControl = new FormControl(0),
    public category: FormControl = new FormControl(''),
    public warrentyDate: FormControl = new FormControl(''),
    public metaData: FormGroup = new FormGroup({}),
  ) {
    super();
  }
}

export class  MetaDataFormControl {
  constructor(
    public id: FormControl = new FormControl(''),
    public audio: FormControl = new FormControl(''),
    public battery: FormControl = new FormControl(''),
    public camera: FormControl = new FormControl(''),
    public color: FormControl = new FormControl(''),
    public cPUSeries: FormControl = new FormControl(''),
    public dimensions: FormControl = new FormControl(''),
    public gPUSeries: FormControl = new FormControl(''),
    public hardDrive: FormControl = new FormControl(''),
    public manufacturersId: FormControl = new FormControl(''),
    public operatingSystem: FormControl = new FormControl(''),
    public ports: FormControl = new FormControl(''),
    public publishedDate: FormControl = new FormControl(''),
    public ram: FormControl = new FormControl(''),
    public screenResolution: FormControl = new FormControl(''),
    public seriesName: FormControl = new FormControl(''),
    public weight: FormControl = new FormControl(''),
    public wLAN: FormControl = new FormControl(''),
  ) {}
}
