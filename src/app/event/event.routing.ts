import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './eventsList/eventsList.component';
import { EventCardComponent } from './eventCard/eventCard.component';

const routes: Routes = [
  { path: '', component: EventsListComponent },
  { path: 'event/:id', component: EventCardComponent }
];

export const EventRoutes = RouterModule.forChild(routes);
