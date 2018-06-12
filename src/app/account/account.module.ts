import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutes } from './account.routing';
import { SettingsComponent } from './settings/settings.component';
import { AddEventComponent } from './addEvent/addEvent.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { GenerateShortComponent } from './addEvent/generateShort/generateShort.component';
import { LocationComponent } from './addEvent/location/location.component';
import { EventService } from '../services/event.service';
import { ImageUploadModule } from 'angular2-image-upload';
import { SummaryComponent } from './addEvent/summary/summary.component';
import { MyEventsListComponent } from './myEventsList/myEventsList.component';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutes,
    MaterialModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FormsModule,
    ImageUploadModule.forRoot()
  ],
  declarations: [AccountComponent,
    SettingsComponent,
    AddEventComponent,
    GenerateShortComponent,
    LocationComponent,
    SummaryComponent,
    MyEventsListComponent
],
  providers: [EventService]
})
export class AccountModule { }
