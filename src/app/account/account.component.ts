import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SiteHelperService } from '../services/siteHelper.service';
import { EventService } from '../services/event.service';
import { PageLocation } from '../services/PageLocation.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  isHandset$ = this.sitehelper.isHandset$;
  titleCard = '';
  constructor(
    private sitehelper: SiteHelperService,
    public location: Location,
    public eventsService: EventService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      this.titleCard = PageLocation[this.location.path().split('/')[2]];
    });
  }

  ngOnInit(): void {

  }
}
