import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray
} from '@angular/forms';
import { FileHolder } from 'angular2-image-upload';
import { Event } from '../../shared/interface/event.interface';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { SiteHelperService } from '../../shared/services/siteHelper.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-addEvent',
  templateUrl: './addEvent.component.html',
  styleUrls: ['./addEvent.component.scss']
})
export class AddEventComponent implements OnInit {
  toDayDate = new Date();
  startData = new Date();

  objectKeys = Object.keys;
  finnaly: false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  dateFormGroup: FormGroup;
  myHeaders: { [name: string]: any } = {
    Authorization: 'Client-ID 331681babe176f3'
  };
  constructor(
    public sitehelper: SiteHelperService,
    public eventservice: EventService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.firstFormGroup = this.eventservice.firstFormGroup;
    this.secondFormGroup = this.eventservice.secondFormGroup;
    this.dateFormGroup = this.eventservice.dateFormGroup;
  }

  ngOnInit() {}
  onSubmit() {
    console.log(this.firstFormGroup);
  }

  shortDescriptionGenerate(shortDesc) {
    this.firstFormGroup.patchValue({ shortDescription: shortDesc });
  }

  onLOcationChange(locationData) {
    this.secondFormGroup.patchValue({ location: locationData });
    console.log(
      Object.assign(this.secondFormGroup.value, this.firstFormGroup.value)
    );
  }

  onUploadFinished(file: FileHolder) {
    const images = <FormArray>this.secondFormGroup.get('images');
    // tslint:disable-next-line:max-line-length
    const fileData: {
      data: { link: string; deletehash: string };
      success: number;
      status: number;
    } = JSON.parse(file.serverResponse.response._body);
    images.push(new FormControl(fileData.data.link));
  }

  onRemovedImage(image) {
    const Removeimage = JSON.parse(image.serverResponse.response._body).data
      .link;
    const images = <FormArray>this.secondFormGroup.get('images');
    images.removeAt(images.value.findIndex(_image => _image === Removeimage));
  }

  SummaryEvent(): Event {
    const firstFormGroup = this.firstFormGroup.value;
    const secondFormGroup = this.secondFormGroup.value;
    secondFormGroup['date']['start'] = secondFormGroup['date'][
      'start'
    ].toString();
    secondFormGroup['date']['end'] = secondFormGroup['date']['end'].toString();
    const EventObj = Object.assign(firstFormGroup, secondFormGroup);
    return EventObj;
  }

  addEvent(stepper) {
    this.eventservice.addEvent(this.SummaryEvent());
    this.openSnackBar('event has been added');
    setTimeout(() => {
      stepper.reset();
      this.router.navigate(['/account/eventslist']);
    }, 1500);
  }

  openSnackBar(message: string, action: string = 'click') {
    this.snackBar.open(message, action, {
      duration: 1500
    });
  }

  minFilter = (d: Date): boolean => {
    const startDate = new Date(this.dateFormGroup.get('start').value);
    if (startDate) {
      if (d < startDate) {
        return false;
      }
      return true;
    }
  }
}
