import { FormControl, FormGroup, Validators } from "@angular/forms";

export class BasicTableHeaderFormControl {
  constructor(
    public idxSelected : FormControl = new FormControl(false),
  ) { }
}

export class BasicTableBodyFormControl {
  constructor(
    public idxSelected : FormControl = new FormControl(false),
   ) { }
}

