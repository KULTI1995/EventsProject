import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PageLocation } from '../shared/services/PageLocation.enum';
import { EventService } from '../shared/services/event.service';
import { SiteHelperService } from '../shared/services/siteHelper.service';

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
