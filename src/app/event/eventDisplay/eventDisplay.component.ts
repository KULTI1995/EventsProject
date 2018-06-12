import { Component, Input, AfterContentInit, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { LocationService } from '../../services/location.service';
import { Event } from '../event.interface';
import { EventClass } from '../EventClass';

@Component({
  selector: 'app-eventDisplay',
  templateUrl: './eventDisplay.component.html',
  styleUrls: ['./eventDisplay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDisplayComponent {
  @Input() event: EventClass;
  distanceToEvent = 0;
  constructor(public locationservice: LocationService) {}

  getDistance() {
    let distance = 0;
    this.locationservice.$location.subscribe(location => {
      if (location) {
        distance = this.event.distanceMeter(location.lat, location.lng);
      }
    });
    return distance;
  }

  getDayCountToEvent() {
    const todayDATE = new Date();
    const eventDATE = new Date(this.event.date.start);
    const diff = eventDATE.getTime() - todayDATE.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }
}
