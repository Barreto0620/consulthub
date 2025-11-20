import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Se o usuário já está autenticado, redireciona para consultores
    this.authService.getCurrentUser().then(user => {
      if (user) {
        this.router.navigate(['/consultores']);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    try {
      const result = await this.authService.login(email, password);
      
      if (result.success) {
        console.log('Login bem-sucedido! Redirecionando...');
        await this.router.navigate(['/consultores']);
      } else {
        this.errorMessage = result.error || 'Email ou senha inválidos. Tente novamente.';
      }
    } catch (error: any) {
      console.error('Erro crítico no login:', error);
      this.errorMessage = error?.message || 'Ocorreu um erro inesperado. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}