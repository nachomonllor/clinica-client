import { Component, Input } from '@angular/core';

import { FormGroup, FormArray } from '@angular/forms';
@Component({
  selector: 'app-custom-field',
  templateUrl: './custom-field.component.html',
  styleUrls: ['./custom-field.component.scss']
})
export class CustomFieldComponent {
  @Input() form: FormGroup;
  @Input() readonly: boolean;
  constructor() {}
  get customfields() {
    return this.form.get('customfields') as FormArray;
  }
}
