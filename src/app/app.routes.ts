import { Routes } from '@angular/router';
// Importe seus componentes aqui
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { Lista } from './features/consultores/lista/lista';
import { FormComponent } from './features/consultores/form/form.component';
import { DetalheComponent } from './features/consultores/detalhe/detalhe.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'consultores',
    component: Lista,
    canActivate: [authGuard]
  },
  {
    path: 'consultores/novo',
    component: FormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'consultores/editar/:id',
    component: FormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'consultores/:id',
    component: DetalheComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' }
];