import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { ButtonComponent } from './button/button.component';
import { SelectComponent } from './select/select.component';
import { DateComponent } from './date/date.component';
import { RadiobuttonComponent } from './radiobutton/radiobutton.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { DynamicFieldDirective } from './dynamic-field/dynamic-field.directive';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { MaterialModule } from '../../shared/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent
  ]
})
export class FormBuilderModule {}
