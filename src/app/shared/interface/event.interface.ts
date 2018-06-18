export interface Event {
  key: string;
  title: string;
  description: string;
  shortDescription: string;
  location: {zip: string,
            city: string,
            country: string,
            lat: string,
            lng: string};
  author: {uid: string, name: string};
  images: Array<string>;
  category: string;
}
