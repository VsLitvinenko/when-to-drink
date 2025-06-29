import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'create',
    loadComponent: () => import('./pages/create-event-page/create-event-page.component').then(m => m.CreateEventPageComponent),
  },
  {
    path: 'vote',
    loadComponent: () => import('./pages/vote-event-page/vote-event-page.component').then(m => m.VoteEventPageComponent),
  },
  {
    path: '',
    redirectTo: 'vote',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'vote',
  },
];
