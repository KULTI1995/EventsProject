import {
  Component,
  ElementRef,
  NgModule,
  NgZone,
  OnInit,
  ViewChild,
  Output
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  public loading = false;
  public latitude: number;
  public longitude: number;
  public latitude2: number;
  public longitude2: number;
  public searchControl: FormControl;
  public zoom: number;
  @Output() LocationChange: EventEmitter<object> = new EventEmitter();

  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  ngOnInit() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.latitude2 = 39.8282;
    this.longitude2 = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['address']
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          const lat = (this.latitude = place.geometry.location.lat());
          const lng = (this.longitude = place.geometry.location.lng());
          this.zoom = 12;
          const result = place.address_components;
          const obj = { lat: lat, lng: lng };
          const goodResult = this.generatePlaceObject(obj, result);
          this.emitData(goodResult);
        });
      });
    });
  }

  generatePlaceObject(Obj: object, place) {
    const goodResult = Obj;
    place.forEach(resultRow => {
      switch (resultRow.types[0]) {
        case 'locality':
          goodResult['city'] = resultRow.short_name;
          break;
        case 'country':
          goodResult['country'] = resultRow.short_name;
          break;
        case 'postal_code':
          goodResult['zip'] = resultRow.short_name;
          break;
        default:
          return false;
      }
    });
    return goodResult;
  }

  setCurrentPosition(event: Event) {
    event.preventDefault();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.codeLatLng(this.latitude, this.longitude);
      });
    }
  }

  codeLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const result = results[0].address_components;
        const obj = { lat: lat, lng: lng };

        const goodResult = this.generatePlaceObject(obj, result);
        this.emitData(goodResult);

        this.searchControl.patchValue(results[0].formatted_address);
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }

  emitData(locationData: Object) {
    this.LocationChange.emit(locationData);
  }
}
