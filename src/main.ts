import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // <--- Correção aqui

bootstrapApplication(AppComponent, appConfig) // <--- Usar AppComponent
  .catch((err) => console.error(err));