import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-generateShort',
  templateUrl: './generateShort.component.html',
  styleUrls: ['./generateShort.component.css']
})
export class GenerateShortComponent implements OnInit {
  @Input() shortText: String;
  @Output() short: EventEmitter<String> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  sliceBadSimbol(rawShort: string): string {
    const badSimbol = ['<p>', '</p>', '<b>', '</b>', '<strong>', '</strong>'];

    let goodShort = '';
    badSimbol.forEach(simbol => {
      if (goodShort === '') {
        goodShort = rawShort.replace(simbol, '');
      } else {
        goodShort = goodShort.replace(simbol, '');
      }
    });
    return goodShort;
  }

  decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}
  generateShortDescription(event:Event) {
    event.preventDefault();
    const entityDecoded = this.decodeHtml(this.shortText);
    const rawShort = entityDecoded.split('.')[0];
    const replace = this.sliceBadSimbol(rawShort);
    this.short.emit(replace);
  }
}
