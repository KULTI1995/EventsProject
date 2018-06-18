import { Routes, RouterModule } from '@angular/router';
import { EventsListComponent } from './eventsList/eventsList.component';
import { EventCardComponent } from './eventCard/eventCard.component';
import { MainListEventsComponent } from './eventsList/mainListEvents/mainListEvents.component';
import { FilteredListEventsComponent } from './eventsList/filteredListEvents/filteredListEvents.component';

const routes: Routes = [
  { path: '', component: EventsListComponent, children:
  [
    {
    path: '', component: MainListEventsComponent
    },
    {
      path: 'filtered', component: FilteredListEventsComponent
      }
  ]},
  { path: 'event/:id', component: EventCardComponent }
];

export const EventRoutes = RouterModule.forChild(routes);
