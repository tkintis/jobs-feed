import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'jobs',
        loadChildren: () => import('./features/jobs/jobs.routes').then((r) => r.jobsRoutes),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'jobs',
        pathMatch: 'full',
    },
];
