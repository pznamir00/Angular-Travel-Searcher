import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';
import { FlightNamePipe } from './pipes/flight-name.pipe';
import { ResultsComponent } from './results.component';

@NgModule({
  declarations: [ResultsComponent, FlightNamePipe],
  imports: [CommonModule, NbCardModule],
  exports: [ResultsComponent],
})
export class ResultsModule {}
