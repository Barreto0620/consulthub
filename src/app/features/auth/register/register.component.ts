import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Se o usuário já está autenticado, redireciona para consultores
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/consultores']);
    }
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const { email, password } = this.registerForm.value;
      try {
        const result = await this.authService.register(email, password);
        if (result.success) {
          this.router.navigate(['/consultores']);
        } else {
          this.errorMessage = result.error || 'Erro ao criar conta';
        }
      } catch (error) {
        this.errorMessage = 'Erro inesperado. Tente novamente.';
      } finally {
        this.loading = false;
      }
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}