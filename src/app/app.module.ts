import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSearchModule } from './main-search/main-search.module';
import { ResultsModule } from './results/results.module';
import { AirportsEffects } from './store/airports/airports.effects';
import { airportsReducer } from './store/airports/airports.reducer';
import { FlightsEffects } from './store/flights/flights.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainSearchModule,
    ResultsModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    StoreModule.forRoot({
      airports: airportsReducer,
    }),
    EffectsModule.forRoot([AirportsEffects, FlightsEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
