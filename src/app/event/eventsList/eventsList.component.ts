import {EventService} from '../../services/event.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollDirective } from 'ngx-drag-scroll';

@Component({
  selector: 'app-eventsList',
  templateUrl: './eventsList.component.html',
  styleUrls: ['./eventsList.component.scss']
})
export class EventsListComponent implements OnInit {
  @ViewChild('nav', {read: DragScrollDirective}) ds: DragScrollDirective;
  leftNavDisabled = false;
  rightNavDisabled = false;
  constructor(public eventsservice: EventService) { }

  ngOnInit() {
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
}
}
