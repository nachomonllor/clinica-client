import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-filter',
  templateUrl: './schedule-filter.component.html',
  styleUrls: ['./schedule-filter.component.scss'],
})
export class ScheduleFilterComponent implements OnInit {
  @Output() searchValues = new EventEmitter();
  searching = false;
  form: FormGroup = new FormGroup({
    // patientId: new FormControl(null),
    // professionalId: new FormControl(null),
    status: new FormControl('1'),
    CategoryId: new FormControl(null),
    temperature: new FormControl(null),
    dateAppointment:  new FormControl(null),
  });
  constructor() { }

  ngOnInit() {
  }
  onSearch() {
    const values = {
      status: +this.form.get('status').value,
      CategoryId: +this.form.get('CategoryId').value,
    };
    this.searchValues.emit(JSON.stringify(values));
  }
  onClear() {
    
  }
}
