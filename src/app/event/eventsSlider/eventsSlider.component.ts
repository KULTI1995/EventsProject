import {
  Component
} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-eventsSlider',
  templateUrl: './eventsSlider.component.html',
  styleUrls: ['./eventsSlider.component.scss']
})
export class EventsSliderComponent {
  constructor(public location: Location) {}

}
