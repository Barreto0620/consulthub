import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
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

  // ✅ CORRIGIDO: Agora é assíncrono
  async getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe(); // Cancela o listener após obter o resultado
        resolve(user);
      });
    });
  }

  // ✅ NOVO: Método síncrono para acesso rápido (opcional)
  getCurrentUserSync(): User | null {
    return this.auth.currentUser;
  }

  // ✅ NOVO: Observable para monitorar mudanças no estado de autenticação
  getAuthState(): Observable<User | null> {
    return new Observable<User | null>((observer) => {
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        observer.next(user);
      });
      return { unsubscribe };
    });
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
        return 'Senha muito fraca (mínimo 6 caracteres)';
      case 'auth/invalid-email':
        return 'Email inválido';
      case 'auth/invalid-credential':
        return 'Email ou senha inválidos';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde.';
      default:
        return 'Erro ao autenticar. Tente novamente.';
    }
  }
}