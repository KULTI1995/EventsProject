import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-myEventsList',
  templateUrl: './myEventsList.component.html',
  styleUrls: ['./myEventsList.component.scss']
})
export class MyEventsListComponent implements OnInit {

  constructor(public eventsService: EventService) { }

  ngOnInit() {
  }

}
