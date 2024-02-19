import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin(){
    if(this.loginForm.valid){
        console.log(this.loginForm.value)
        
        this.authService.onLogin(this.loginForm.value).subscribe({
            next: (response) => {
              if(response.status){
                console.log(response.msg)
                this.router.navigate(['dashboard']);

              }else{
                console.log(response.msg)
              }
            },
            error: (error) => {
              console.error(error)
            },
 
        })

    }else{

      this.loginForm.markAllAsTouched();
    }
  }
}
