import { Routes } from '@angular/router';
import { NotFound } from './pages/not-found/not-found';
import { ServerError } from './pages/server-error/server-error';

export const routes: Routes = [
  {
    path: 'repos',
    loadComponent: () => import('./repos/repos').then(m => m.Repos),
  },
  {
    path: 'commits/:owner/:repo',
    loadComponent: () => import('./repos/commits/commits').then(m => m.Commits),
  },
  {
    path: '',
    redirectTo: 'repos',
    pathMatch: 'full',
  },
  { path: '500', component: ServerError },
  { path: '**', component: NotFound },
];
