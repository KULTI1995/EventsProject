import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { debounce } from '../../shared/services/debounce';

@Component({
  selector: 'app-filtersTable',
  templateUrl: './filtersTable.component.html',
  styleUrls: ['./filtersTable.component.scss']
})
export class FiltersTableComponent implements OnInit {
  
  filters = {
    category: '',
    distance: 10,
    time: '',
    title: ''
  };

  times = [
      {timeString: '0:1', caption:'from today to tomorrow'},
      {timeString: '0+1:0', caption:'tomorrow'},
      {timeString: '0:2', caption:'Within two days'},
      {timeString: '0+2:0', caption:'for two days'},
      {timeString: '1:7', caption:'this week'},
      {timeString: '8:7', caption:'Next week'},
      {timeString: '0:14', caption:'Within 2 weeks'},
      {timeString: '*5:7', caption:'in all weekend'},
  ];
  categories:Array<string>;
  constructor(public eventsservice: EventService, private router:Router) {
    this.categories = this.eventsservice.categoriesArray;
  }

  ngOnInit() {
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1) {
      return Math.round(value) + 'km';
    }

    return value;
  }
  deleteTitleInput(input_ref){
    input_ref.value='';
    this.filters.title='';
    this.changeFilters();
  }

  clearAllFilters(){
    this.filters.category = '';
    this.filters.title = '';
    this.filters.distance = 0;
    this.filters.time = '';

    this.changeFilters();
  }

  @debounce(500)
  changeFilters(){
    console.log(this.filters);
    this.eventsservice.filters = this.filters;
    setTimeout(() => {
      this.eventsservice.$filtersChange.next();

      if(this.filters.category ||
        this.filters.title ||
        this.filters.time ||
        this.filters.distance){
        this.router.navigate(['filtered']);
      }
    }, 500);
  }

  

}
