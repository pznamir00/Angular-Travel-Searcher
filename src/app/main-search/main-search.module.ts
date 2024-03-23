import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MainSearchComponent } from './main-search.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  declarations: [MainSearchComponent],
  exports: [MainSearchComponent],
})
export class MainSearchModule {}
