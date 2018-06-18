import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/event/event.module#EventModule'
  },
  {
    path: 'account',
    loadChildren: 'app/account/account.module#AccountModule',
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
