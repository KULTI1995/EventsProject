import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Event } from '../event/event.interface';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { AuthService } from './auth.service';
import { map, filter, switchMap } from 'rxjs/operators';
import { User } from '@firebase/auth-types';
import { EventClass } from '../event/EventClass';
import { Observable, of } from 'rxjs';
import { LocationService } from './location.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable()
export class EventService {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  allEvents: Observable<Array<EventClass>>;
  user: User = null;
  userEvents: Observable<Array<EventClass>>;
  constructor(
    public afDB: AngularFireDatabase,
    private _formBuilder: FormBuilder,
    private auth: AuthService,
    private locationservice: LocationService,
    private localStorage: LocalStorage
  ) {
    this.addFormsInit();
    this.getAllEvents();
    this.getAllUserEvents();
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
    return this.locationservice.$location.pipe(
      switchMap(location => {
        if (location) {
          return this.allEvents.pipe(
            map(events =>
              events.filter(
                event =>
                  event.distanceMeter(location.lat, location.lng) <= radius
              )
            )
          );
        } else {
          return of(null);
        }
      })
    );
  }

  saveEventToLocalStorage(event: EventClass) {
    this.localStorage.getItem('events').subscribe(events => {
      if (events === null) {
        this.localStorage.setItemSubscribe('events', event);
      } else {
        const eventsArray = [];
        eventsArray.push(event);
        (events.constructor === Array) ? eventsArray.push(...events) : eventsArray.push(events);
        this.localStorage.setItemSubscribe('events', eventsArray);
      }
    });
  }

  getEventsFromLocalStorage() {
    this.localStorage.getItem('events').subscribe(console.log);
  }

  getEventOfCategory(category: string) {
    return this.allEvents.pipe(
      map(actions =>
        actions.filter((event: EventClass) => event.category === category)
      )
    );
  }

  /*
    syntax:
    0:1 - from day, to day.
    1:0:0

  */
  getEventOfDayString(day: string) {
    return this.allEvents.pipe(
      map(actions =>
        actions.filter((event: EventClass) => event.category === category)
      )
    );
  }
}
