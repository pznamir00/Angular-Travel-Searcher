import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbCardModule, NbProgressBarModule } from '@nebular/theme';
import { FlightNamePipe } from './pipes/flight-name.pipe';
import { FlightTimesPipe } from './pipes/flight-times.pipe';
import { ResultCardComponent } from './result-card/result-card.component';
import { ResultsComponent } from './results.component';

@NgModule({
  declarations: [
    ResultsComponent,
    FlightNamePipe,
    FlightTimesPipe,
    ResultCardComponent,
  ],
  imports: [CommonModule, NbCardModule, NbProgressBarModule],
  exports: [ResultsComponent],
})
export class ResultsModule {}
