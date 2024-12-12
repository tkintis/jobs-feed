import { Routes } from '@angular/router';

export const jobsRoutes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./components/list/jobs-list.component').then((c) => c.JobsListComponent),
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
];
