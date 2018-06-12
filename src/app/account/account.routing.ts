import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AddEventComponent } from './addEvent/addEvent.component';
import { SettingsComponent } from './settings/settings.component';
import { MyEventsListComponent } from './myEventsList/myEventsList.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'addevent' },
      { path: 'eventslist', component: MyEventsListComponent },
      { path: 'addevent', component: AddEventComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }

];

export const AccountRoutes = RouterModule.forChild(routes);
