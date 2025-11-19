import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<AuthResult> {
    try {
      const credential = await signInWithEmailAndPassword(this.auth, email, password);
      return { 
        success: true, 
        user: credential.user 
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  }

  async register(email: string, password: string): Promise<AuthResult> {
    try {
      const credential = await createUserWithEmailAndPassword(this.auth, email, password);
      return { 
        success: true, 
        user: credential.user 
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  private getErrorMessage(error: any): string {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado';
      case 'auth/wrong-password':
        return 'Senha incorreta';
      case 'auth/email-already-in-use':
        return 'Email já cadastrado';
      case 'auth/weak-password':
        return 'Senha muito fraca';
      case 'auth/invalid-email':
        return 'Email inválido';
      default:
        return 'Erro ao autenticar. Tente novamente.';
    }
  }
}