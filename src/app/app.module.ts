import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSearchModule } from './main-search/main-search.module';
import { airportsReducer } from './store/airports/airports.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainSearchModule,
    NbLayoutModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    StoreModule.forRoot({
      airports: airportsReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
