import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { EventClass } from '../EventClass';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { LocationService } from '../../shared/services/location.service';

@Component({
  selector: 'app-eventDisplay',
  templateUrl: './eventDisplay.component.html',
  styleUrls: ['./eventDisplay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventDisplayComponent implements OnInit{
  @Input() event: EventClass;
  $getDistance = new BehaviorSubject(0);
  constructor(private locationservice: LocationService) {}
  
  ngOnInit(): void {
    this.getDistance();
  }

  getDistance() {
    this.locationservice.$location.pipe(
      switchMap(location => {
        if(location===null){
          return of(0);
        } else{
          return of(this.event.distanceMeter(location.lat, location.lng));
        }
      })
    ).subscribe((distance)=>{
      this.$getDistance.next(distance);
    })
  }

  timeColor(TimetoEvent:number){
    if(TimetoEvent>5){
      return 'firebrick';
    } else if(TimetoEvent<=5 && TimetoEvent>0){
      return 'green';
    }
    return 'gray';
  }

  getDayCountToEvent() {
    const todayDATE = new Date();
    const eventDATE = new Date(this.event.date.start);
    const diff = eventDATE.getTime() - todayDATE.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }
}
