import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, forwardRef } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { MainSearchComponent } from './main-search.component';
import { AddressInputComponent } from './value-accessors/address-input/address-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbCalendarRangeModule,
    NbIconModule,
    NbEvaIconsModule,
    FormsModule,
  ],
  declarations: [MainSearchComponent, AddressInputComponent],
  exports: [MainSearchComponent],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressInputComponent),
      multi: true,
    },
  ],
})
export class MainSearchModule {}
