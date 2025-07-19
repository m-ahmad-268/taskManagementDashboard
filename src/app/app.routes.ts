import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./main-module/main-module.module').then(m => m.MainModuleModule),
        // canActivate: [AuthGuard]
    },
    {
        path: 'login',
        loadChildren: () => import('./auth-module/auth-module.module').then(m => m.AuthModuleModule)
    },
    {
        path: '**',
        redirectTo: ''
    }

];
