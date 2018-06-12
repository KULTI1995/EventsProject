import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { EventClass } from '../EventClass';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-eventCard',
  templateUrl: './eventCard.component.html',
  styleUrls: ['./eventCard.component.scss']
})
export class EventCardComponent implements OnInit {
  event: EventClass;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private eventservice: EventService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {
    this.id = this.route.snapshot.params['id'];
    this.eventservice.getEvent(this.id).subscribe(event => {
      this.event = event;
      this.eventservice.saveEventToLocalStorage(this.event);
      //this.eventservice.getEventsFromLocalStorage();
    });
    // if (!this.id) {
    //     this.location.go('/');
    // }
  }

  ngOnInit() {
    //this.eventservice.getEventsInRadius(70).subscribe(console.log);
  }

  assembleHTMLItem() {
    return this.sanitizer.bypassSecurityTrustHtml(this.event.description);
  }
}
