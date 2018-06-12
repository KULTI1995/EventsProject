import { Event } from './event.interface';

export class EventClass {
  key: string;
  title: string;
  description: string;
  shortDescription: string;
  location: {
    zip: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
  date: {
    now: string;
    start: string;
    end: string;
    };
  author: { uid: string; name: string };
  images: Array<string>;
  category: string;
  constructor(event: Event) {
    return Object.assign(this, event);
  }

  distanceMeter(lat, lng) {
    const sin = Math.sin;
    const cos = Math.cos;
    const acos = Math.acos;

    const lat1 = this.location.lat;
    const lng1 = this.location.lng;
    const lat2 = lat;
    const lng2 = lng;

    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }
}
