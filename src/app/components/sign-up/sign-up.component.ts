import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public showPassword: boolean = false;
  public showConfirmPassword: boolean = false;
  public emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordFormGroup: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  get password() {
    return this.passwordFormGroup.get('password');
  }
  get password2() {
    return this.passwordFormGroup.get('password2');
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onPasswordInput() {
    if (this.passwordFormGroup.hasError('passwordMismatch'))
      this.password2?.setErrors([{ passwordMismatch: true }]);
    else this.password2?.setErrors(null);
  }
}

export const passwordMatchValidator: ValidatorFn = (
  formGroup: AbstractControl
): ValidationErrors | null => {
  return formGroup.get('password')?.value === formGroup.get('password2')?.value
    ? null
    : { passwordMismatch: true };
};
