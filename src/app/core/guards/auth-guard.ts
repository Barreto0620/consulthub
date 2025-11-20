import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  // Verifica se há um usuário autenticado
  if (auth.currentUser) {
    return true;
  }

  // Se não estiver autenticado, redireciona para login
  router.navigate(['/login']);
  return false;
};
