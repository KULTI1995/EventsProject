import { Pipe, PipeTransform } from '@angular/core';
import { EventService } from '../services/event.service';

@Pipe({
  name: 'hightlight'
})
export class HightlightPipe implements PipeTransform {

  constructor(private eventservices: EventService){}
  transform(value: any, args?: any): any {
    
    const title = this.eventservices.filters.title;
    if (title){
      value = value.replace(new RegExp('('+title+')', 'gi'),
      '<span class="highlighted">$1</span>')

    return value;
    }
    return value;
  }

}
