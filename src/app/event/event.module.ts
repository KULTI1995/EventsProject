import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDisplayComponent } from './eventDisplay/eventDisplay.component';
import { EventCardComponent } from './eventCard/eventCard.component';
import { MaterialModule } from '../material.module';
import { EventsListComponent } from './eventsList/eventsList.component';
import { EventsSliderComponent } from './eventsSlider/eventsSlider.component';
import { RedirectCardComponent } from './eventDisplay/redirectCard/redirectCard.component';
import { EventRoutes } from './event.routing';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { AddToFavoritesComponent } from './eventCard/addToFavorites/addToFavorites.component';
import { MainListEventsComponent } from './eventsList/mainListEvents/mainListEvents.component';
import { FilteredListEventsComponent } from './eventsList/filteredListEvents/filteredListEvents.component';
import { FiltersTableComponent } from './filtersTable/filtersTable.component';
import { ListOfFiltersComponent } from './filtersTable/listOfFilters/listOfFilters.component';
import { HightlightPipe } from '../shared/pipe/hightlight.pipe';
import { EventService } from '../shared/services/event.service';
import { LocationService } from '../shared/services/location.service';
@NgModule({
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    EventRoutes,
    LazyLoadImageModule,
    FlexLayoutModule,
    NgbModule,
    SwiperModule
  ],
  declarations: [
    EventDisplayComponent,
    EventCardComponent,
    EventsListComponent,
    EventsSliderComponent,
    RedirectCardComponent,
    AddToFavoritesComponent,
    MainListEventsComponent,
    FilteredListEventsComponent,
    ListOfFiltersComponent,
    FiltersTableComponent,
    HightlightPipe
],
  providers: [
    LocationService,
    EventService
  ]
})
export class EventModule { }
