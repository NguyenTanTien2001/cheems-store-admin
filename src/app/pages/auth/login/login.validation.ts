import { LoginComponent } from "./login.component";

export class LoginValidation {
  constructor(
      public loginComponent: LoginComponent
  ){}

  input = {
      EMAIL: 'email',
      PASSWORD: 'password'
  }

  // email
  get email(){
     return this.loginComponent.formBody().get(this.input.EMAIL);
  }

  get isEmailInvalid() {
      return this.email?.invalid && (this.email.touched || this.email.dirty);
  }

  // password
  get password(){
    return this.loginComponent.formBody().get(this.input.PASSWORD);
  }

  get isPasswordInvalid() {
      return this.password?.invalid && (this.password.touched || this.password.dirty);
  }

   //submit button
   get isSubmitInvalid() {
      return (this.isEmailInvalid || !this.email?.dirty) || (this.isPasswordInvalid || !this.password?.dirty);
   }
}
