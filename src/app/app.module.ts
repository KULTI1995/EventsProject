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
import { AuthService } from './services/auth.service';
import { MaterialModule } from './material.module';
import { AuthGuard } from './guards/auth.guard';
import { HeaderComponent } from './header/header.component';
import { SiteHelperService } from './services/siteHelper.service';
import { EventService } from './services/event.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LocationService } from './services/location.service';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBPp9Trq6KqZh8BK-7Q0Zc_mpzIyqJDalo',
      libraries: ['places']
    }),
    FlexLayoutModule,
    NgbModule.forRoot()
  ],
  providers: [AuthGuard, AuthService, SiteHelperService, EventService, LocationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
