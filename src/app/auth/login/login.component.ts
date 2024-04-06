import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseAuthModularService } from '@fire-modular/firebase-auth-modular.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public readonly form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private firebaseAuthModularService: FirebaseAuthModularService,
    private router: Router
  ) {}

  // Submit form
  public onSubmit(): void {
    if (this.form.valid) {
      this.firebaseAuthModularService
        .signInWithEmailAndPassword(
          this.emailFormControl.value,
          this.passwordFormControl.value
        )
        .subscribe({ complete: () => this.router.navigate(['/']) });
    }
  }

  // Getters
  get emailFormControl() {
    return this.form.get('email') as FormControl;
  }
  get passwordFormControl() {
    return this.form.get('password') as FormControl;
  }
}
