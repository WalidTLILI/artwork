export class Form {

  // Used to display errors if form is not valid
  static validate(form) {
    Object.keys(form.controls).map(control => form.controls[control].markAsTouched({onlySelf: true}));
  }
}
