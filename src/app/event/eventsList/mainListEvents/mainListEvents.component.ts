import { Component, OnInit, HostListener } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { EventService } from '../../../shared/services/event.service';
import { debounce } from '../../../shared/services/debounce';

@Component({
  selector: 'app-mainListEvents',
  templateUrl: './mainListEvents.component.html',
  styleUrls: ['./mainListEvents.component.scss']
})
export class MainListEventsComponent implements OnInit {

  ElementsInLocalStorage = 0;
  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 4,
    watchOverflow: true
  };
  constructor(public eventsservice: EventService) { }

  ngOnInit() {
    this.config.slidesPerView = Math.round(((window.innerWidth/300)-0.3));
    this.eventsservice.localStorage.getItem('events').subscribe(events=>{
      if(events===null){
        this.ElementsInLocalStorage = 0;
      } else{
        this.ElementsInLocalStorage = events.length;
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  @debounce()
  onResize(event) {
    const width = Math.round(((window.innerWidth/300)-0.3));
    console.log(width);
    this.config.slidesPerView = width
  }
}
