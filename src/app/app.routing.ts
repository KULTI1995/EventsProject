import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { EventModule } from './event/event.module';
import { AccountModule } from './account/account.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => EventModule
  },
  {
    path: 'account',
    loadChildren: () => AccountModule,
    // canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
