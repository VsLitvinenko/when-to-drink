import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'edit',
    loadComponent: () =>
      import('./pages/update-event-page/update-event-page.component').then(
        (m) => m.UpdateEventPageComponent
      ),
  },
  {
    path: 'vote',
    loadComponent: () =>
      import('./pages/vote-event-page/vote-event-page.component').then(
        (m) => m.VoteEventPageComponent
      ),
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
