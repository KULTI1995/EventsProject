import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SiteHelperService } from '../services/siteHelper.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHandset$ = this.sitehelper.isHandset$;
  constructor(
    public auth: AuthService,
    private sitehelper: SiteHelperService,
    public eventsService: EventService
  ) {}

  ngOnInit() {}
}
