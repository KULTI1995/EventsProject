import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listOfFilters',
  templateUrl: './listOfFilters.component.html',
  styleUrls: ['./listOfFilters.component.scss']
})
export class ListOfFiltersComponent implements OnInit {
  @Input() filters;
  constructor() { }

  ngOnInit() {
  }

}
