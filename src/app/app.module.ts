import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutes } from './app.routing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './shared/guards/auth.guard';
import { AuthService } from './shared/services/auth.service';
import { SiteHelperService } from './shared/services/siteHelper.service';
import { LocationService } from './shared/services/location.service';
import { EventService } from './shared/services/event.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MaterialModule,
    AgmCoreModule.forRoot(environment.maps),
    FlexLayoutModule,
    NgbModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, SiteHelperService, EventService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
