import { FormControl } from "@angular/forms";

export class LoginFormControl {
  constructor(
    public email: FormControl = new FormControl(''),
    public password: FormControl = new FormControl(''),
  ) {}
}
