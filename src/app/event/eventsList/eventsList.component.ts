import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';

@Component({
    selector: 'app-eventsList',
    templateUrl: './eventsList.component.html',
    styleUrls: ['./eventsList.component.scss']
})
export class EventsListComponent implements OnInit {
    routeLinks: any[];
    activeLinkIndex = -1;
    getEventsFilter;
    constructor(private router: Router, public eventsservice: EventService) {
        this.getEventsFilter = this.eventsservice.getEventsFilter();
        this.eventsservice.$filtersChange.subscribe(() => {
            this.getEventsFilter = this.eventsservice.getEventsFilter();
        });
        this.routeLinks = [
            {
                label: 'Main page',
                link: '/',
                index: 0
            }, {
                label: 'Filtered events',
                link: '/filtered',
                index: 1
            }
        ];
    }

    ngOnInit(): void {
        this.router.events.subscribe((res) => {
            this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
        });
    }
}
