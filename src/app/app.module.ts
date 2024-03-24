import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MainSearchModule } from './main-search/main-search.module';
import { ResultsModule } from './results/results.module';
import { AirportsEffects } from './store/airports/airports.effects';
import { airportsReducer } from './store/airports/airports.reducer';
import { FlightsEffects } from './store/flights/flights.effects';
import { flightsReducer } from './store/flights/flights.reducer';

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
      flights: flightsReducer,
    }),
    EffectsModule.forRoot([AirportsEffects, FlightsEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
