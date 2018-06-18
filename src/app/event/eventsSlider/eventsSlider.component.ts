import {
  Component, Input, OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import { EventClass } from '../EventClass';
import { Observable } from 'rxjs';
import { EventService } from '../../shared/services/event.service';

@Component({
  selector: 'app-eventsSlider',
  templateUrl: './eventsSlider.component.html',
  styleUrls: ['./eventsSlider.component.scss']
})
export class EventsSliderComponent implements OnInit{
  @Input() category:string;
  @Input() config:object;
  events:Observable<EventClass[]>
  constructor(public location: Location, public eventsservice: EventService) {
  }
  
  ngOnInit() {
    this.events = this.eventsservice.getEventOfCategory(this.category);
  }
}
