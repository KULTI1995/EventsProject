import { Component, OnInit, HostListener } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { debounce } from '../../../shared/services/debounce';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'app-filteredListEvents',
  templateUrl: './filteredListEvents.component.html',
  styleUrls: ['./filteredListEvents.component.scss']
})
export class FilteredListEventsComponent implements OnInit {
  getEventsFilter;
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 4,
    watchOverflow: true
  };
  constructor(public eventsservice:EventService) {
  }

  ngOnInit() {
    this.config.slidesPerView = Math.round(((window.innerWidth/300)-0.3));
    this.getEventsFilter = this.eventsservice.getEventsFilter();
    this.eventsservice.$filtersChange.subscribe(() => {
            this.getEventsFilter = this.eventsservice.getEventsFilter();
        });
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event) {
    const width = Math.round(((window.innerWidth/300)-0.3));
    console.log(width);
    this.config.slidesPerView = width
  }
}
