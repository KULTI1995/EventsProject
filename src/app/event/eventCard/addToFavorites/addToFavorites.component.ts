import { Component, OnInit, Input } from '@angular/core';
import { EventClass } from '../../EventClass';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EventService } from '../../../shared/services/event.service';

@Component({
  selector: 'app-addToFavorites',
  templateUrl: './addToFavorites.component.html',
  styleUrls: ['./addToFavorites.component.scss']
})
export class AddToFavoritesComponent implements OnInit {
  @Input() isFavorite:boolean
  @Input() event:EventClass;
  $isInLocalStorage:boolean
  constructor(private eventservice: EventService) { }

  ngOnInit() {
    this.isInLocalStorage().subscribe((bool)=>{this.$isInLocalStorage = Boolean(bool)});
  }

  changeIsFavorite(){
      if(this.$isInLocalStorage){
        this.eventservice.deleteEventFromLocalStorage(this.event);
        this.$isInLocalStorage = false;
      } else{
        this.eventservice.saveEventToLocalStorage(this.event);
        this.$isInLocalStorage = true;
      }
  }

  isInLocalStorage() {
    return this.eventservice.localStorage.getItem('events').pipe(
      switchMap(events => {
        if(events===null){
          return of(false);
        } else{
          return of(Boolean(events.filter((eventFromLocalStorage)=>eventFromLocalStorage.key === this.event.key).length));
        }
      })
    );
  }
}
