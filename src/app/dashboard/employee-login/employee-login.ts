import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './employee-login.html',
  styleUrl: './employee-login.css'
})
export class EmployeeLogin {
  
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginFeedback = '';
  isLoading = false;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(private router:Router) {

  }
   navigateToHome(){
    this.router.navigate(['hrportaldashboard'])
  }
  onSubmit(): void {

    if (this.loginForm.valid) {
      this.isLoading = true; 
      this.loginFeedback = ''; 
      const { email, password } = this.loginForm.value;


      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password123') {
          this.loginFeedback = 'Login successful!';

          this.loginForm.reset(); 
        } else {
          this.loginFeedback = 'Invalid email or password.';
        }
        this.isLoading = false; 
      }, 1500);
    }
  }
}




