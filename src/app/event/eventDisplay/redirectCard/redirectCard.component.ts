import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-redirectCard',
  templateUrl: './redirectCard.component.html',
  styleUrls: ['./redirectCard.component.css']
})
export class RedirectCardComponent implements OnInit {
  @Input() color;
  constructor() {}

  ngOnInit() {}
}
