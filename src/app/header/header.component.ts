import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SiteHelperService } from '../shared/services/siteHelper.service';
import { EventService } from '../shared/services/event.service';

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
