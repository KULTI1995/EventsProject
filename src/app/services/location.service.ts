import { Injectable, AfterContentInit, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private location = new BehaviorSubject(null);
  public $location = this.location.asObservable();
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.myLocation();
  }

  myLocation() {
    this.mapsAPILoader.load().then(() => {
      this.ngZone.run(() => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            this.codeLatLng(latitude, longitude);
          });
        }
        return null;
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

  codeLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        const result = results[0].address_components;
        const obj = { lat: lat, lng: lng };

        const goodResult = this.generatePlaceObject(obj, result);
        this.location.next(goodResult);
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }
}
