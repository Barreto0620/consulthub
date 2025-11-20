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

  ngOnInit() {
    // Se o usuário já está autenticado, redireciona para consultores
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/consultores']);
    }
  }

  async onSubmit() {
    // Se o formulário estiver inválido, marca todos os campos como "tocados"
    // para exibir as mensagens de erro no HTML imediatamente.
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
        // Redirecionamento bem-sucedido
        await this.router.navigate(['/consultores']);
      } else {
        // Mensagem vinda do serviço ou fallback genérico
        this.errorMessage = result.error || 'Não foi possível realizar o login. Verifique suas credenciais.';
      }
    } catch (error) {
      console.error('Erro crítico no login:', error);
      this.errorMessage = 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
    } finally {
      this.loading = false;
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}