import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventClass } from '../EventClass';
import { DomSanitizer } from '@angular/platform-browser';
import { switchMap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { EventService } from '../../shared/services/event.service';
import { SiteHelperService } from '../../shared/services/siteHelper.service';
import { LocationService } from '../../shared/services/location.service';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss']
})
export class EventCardComponent implements OnInit {
  event: EventClass;
  id: string;
  $getDistance = new BehaviorSubject(0);
  constructor(
    private route: ActivatedRoute,
    private locationservice: LocationService,
    private sanitizer: DomSanitizer,
    public sitehelper: SiteHelperService,
    public eventservice: EventService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.eventservice.getEvent(this.id).subscribe(event => {
      this.event = event;
      this.getDistance().subscribe((distance)=>{
        this.$getDistance.next(distance);
      })
    });
    // if (!this.id) {
    //     this.location.go('/');
    // }
  }

  ngOnInit() {
  }

  assembleHTMLItem() {
    return this.sanitizer.bypassSecurityTrustHtml(this.event.description);
  }

  getDistance() {
    return this.locationservice.$location.pipe(
      switchMap(location => {
        if(location===null){
          return of(0);
        } else{
          return of(this.event.distanceMeter(location.lat, location.lng));
        }
      })
    )
  }

  getDayCountToEvent() {
    const todayDATE = new Date();
    const eventDATE = new Date(this.event.date.start);
    const diff = eventDATE.getTime() - todayDATE.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }
  
}
