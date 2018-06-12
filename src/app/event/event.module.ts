import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDisplayComponent } from './eventDisplay/eventDisplay.component';
import { EventCardComponent } from './eventCard/eventCard.component';
import { EventService } from '../services/event.service';
import { MaterialModule } from '../material.module';
import { EventsListComponent } from './eventsList/eventsList.component';
import { EventsSliderComponent } from './eventsSlider/eventsSlider.component';
import { RedirectCardComponent } from './eventDisplay/redirectCard/redirectCard.component';
import { EventRoutes } from './event.routing';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    FormsModule, ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    EventRoutes,
    LazyLoadImageModule,
    FlexLayoutModule,
    NgbModule
  ],
  declarations: [
    EventDisplayComponent,
    EventCardComponent,
    EventsListComponent,
    EventsSliderComponent,
    RedirectCardComponent
],
  providers: [EventService]
})
export class EventModule { }
