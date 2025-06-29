import { Routes } from '@angular/router';

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
    path: '**',
    loadComponent: () => import('./repos/repos').then(m => m.Repos),
  },
  
];
