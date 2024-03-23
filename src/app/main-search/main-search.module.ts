import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbButtonModule,
  NbCalendarRangeModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
} from '@nebular/theme';
import { MainSearchComponent } from './main-search.component';

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
  ],
  declarations: [MainSearchComponent],
  exports: [MainSearchComponent],
})
export class MainSearchModule {}
