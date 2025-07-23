import { Routes } from '@angular/router';
import { VoteEventPageComponent } from './pages/vote-event-page/vote-event-page.component';
import { EditEventPageComponent } from './pages/edit-event-page/edit-event-page.component';

export const routes: Routes = [
  {
    path: 'edit',
    component: EditEventPageComponent,
    canDeactivate: [(c: EditEventPageComponent) => c.canDeactivate()],
  },
  {
    path: 'vote/:eventId',
    component: VoteEventPageComponent,
    canDeactivate: [(c: VoteEventPageComponent) => c.canDeactivate()],
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
