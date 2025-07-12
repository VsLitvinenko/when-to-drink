import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'edit',
    loadComponent: () =>
      import('./pages/edit-event-page/edit-event-page.component').then(
        (c) => c.EditEventPageComponent
      ),
  },
  {
    path: 'vote/:eventId',
    loadComponent: () =>
      import('./pages/vote-event-page/vote-event-page.component').then(
        (c) => c.VoteEventPageComponent
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then(
        (c) => c.NotFoundPageComponent
      ),
  },
  {
    path: 'not-permitted',
    loadComponent: () =>
      import('./pages/not-permitted-page/not-permitted-page.component').then(
        (c) => c.NotPermittedPageComponent
      ),
  },
  {
    path: '',
    redirectTo: 'edit',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
