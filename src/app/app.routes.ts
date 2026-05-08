import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./pages/inicio/inicio.page').then(m => m.InicioPage) },
  { path: 'informacion', loadComponent: () => import('./pages/informacion/informacion.page').then(m => m.InformacionPage) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto.page').then(m => m.ContactoPage) },
];
