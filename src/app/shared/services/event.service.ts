import { Injectable} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { AuthService } from './auth.service';
import { map, switchMap} from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { Observable, of, Subject } from 'rxjs';
import { LocationService } from './location.service';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { filters } from './filters_to_events';
import { EventClass } from '../../event/EventClass';
import { Event } from '../interface/event.interface';
import { Location } from '../interface/location';

@Injectable()
export class EventService {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  allEvents: Observable<Array<EventClass>>;
  user: User = null;
  userEvents: Observable<Array<EventClass>>;
  EventsFromLocalStorage: Observable<Array<EventClass>>;
  eventsOfFilters: Observable<Array<EventClass>>;
  filters = {
    category: '',
    distance: 10,
    time: '',
    title: ''
  }
  $filtersChange = new Subject();
  // filters
  getEventByTime = filters.getEventByTime;
  getEventByCategory = filters.getEventByCategory;
  getEventByTitle = filters.getEventByTitle;
  getEventsByRadius = filters.getEventByTitle;

  // ##  category  ## //
  categoriesArray = ['IT', 'Design', 'UX'];
  constructor(
    public afDB: AngularFireDatabase,
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private locationservice: LocationService,
    public localStorage: LocalStorage
  ) {
    this.addFormsInit();
    this.getAllEvents();
    this.getAllUserEvents();
    this.getEventsFromLocalStorage();
    auth.afAuth.user.subscribe(user => {
      this.user = user;
      if (user) {
        this.secondFormGroup.patchValue({
          author: { uid: user.uid, name: user.displayName }
        });
      }
    });
  }

  addFormsInit() {
    this.dateFormGroup = this._formBuilder.group({
      now: [new Date().toString(), Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required]
    });

    this.firstFormGroup = this._formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required, Validators.minLength(100)]],
      shortDescription: ['', [Validators.required, Validators.minLength(10)]]
    });
    this.secondFormGroup = this._formBuilder.group({
      category: ['', Validators.required],
      location: this._formBuilder.group({
        zip: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        lat: ['', Validators.required],
        lng: ['', Validators.required]
      }),
      author: this._formBuilder.group({
        uid: ['', Validators.required],
        name: ['', Validators.required]
      }),
      images: new FormArray([]),
      date: this.dateFormGroup
    });
  }

  addEvent(event: Event) {
    this.afDB.list('events').push(event);
  }

  getAllEvents() {
    this.allEvents = this.afDB
      .list<Event>('events')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => new EventClass({ key: a.key, ...a.payload.val() }))
        )
      );
  }

  getEvent(id: string) {
    return this.allEvents.pipe(
      map(actions => actions.find((event: EventClass) => event.key === id))
    );
  }

  deleteEvent(event: Event) {
    this.afDB.database.ref(`events/${event.key}`).remove();
  }

  updateEvent(event: Event) {
    this.afDB.database.ref(`events/${event.key}`).update(event);
  }

  getAllUserEvents() {
    this.userEvents = this.auth.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.allEvents.pipe(
            map(events => events.filter(event => event.author.uid === user.uid))
          );
        } else {
          return of(null);
        }
      })
    );
  }

  getEventsInRadius(radius: number) {
      return switchMap((events: EventClass[]) => {
        return this.locationservice.$location.pipe(
          switchMap((location: Location) => {
            if (location) {
              return of(events.filter(
                event =>
                  event.distanceMeter(location.lat, location.lng) <= radius
              ))
            } else {
              console.log('None location')
              return of(null);
            }
          })
        )
      })
  }
  
  saveEventToLocalStorage(event: EventClass) {
    this.localStorage.getItem('events').subscribe(events => {
      if (events === null) {
        this.localStorage.setItemSubscribe('events', [event]);
      } else {
        const eventsArray = [];
        eventsArray.push(event);
        (events.constructor === Array) ? eventsArray.push(...events) : eventsArray.push(events);
        this.localStorage.setItemSubscribe('events', eventsArray);
      }
    });
  }

  deleteEventFromLocalStorage(event: EventClass) {
    this.localStorage.getItem('events').subscribe(events => {
      const allEvents = events.filter((eventFromLocalStorage) => eventFromLocalStorage.key !== event.key)
      this.localStorage.setItemSubscribe('events', allEvents);
    });
  }

  public getEventsFromLocalStorage() {
    this.EventsFromLocalStorage = this.localStorage.getItem('events').pipe(
      map(events =>
        events.map((event: Event) => new EventClass(event))
      )
    );
  }

  getEventOfCategory(category: string) {
    return this.allEvents.pipe(
      this.getEventByCategory(category)
    );
  }

  /*
    easy syntax:
    0:1 - from day now, plus day.
    1:7 - Next week. - now week.
    *5:2 - (*)recurrence
    0+2:0 - from day now + plus day. AND plus day counter.
  
  */
  getEventOfDayString(dataString) {
    return this.allEvents.pipe(
      this.getEventByTime(dataString)
    );
  }

  getEventsFilter() : Observable<EventClass[]>{
    return this.allEvents.pipe(
      (this.filters.time)?this.getEventByTime(this.filters.time): x => x,
      (this.filters.category)?this.getEventByCategory(this.filters.category): x => x,
      (this.filters.title)?this.getEventByTitle(this.filters.title): x => x,
      (this.filters.distance)?this.getEventsInRadius(this.filters.distance): x => x,
    )
  }
}
