import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import combinate from 'combinate';
import { Observable, combineLatest, filter, first } from 'rxjs';
import { loadAllFlights } from '../store/flights/flights.action';
import {
  selectFlights,
  selectFlightsLoadedNumber,
  selectFlightsTotalNumber,
} from '../store/flights/flights.selector';
import { SingleAirportByPoint } from './types/airports-by-point.type';
import { Flight } from './types/flights-result.type';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  flights$: Observable<Flight[]>;
  loadedNum$: Observable<number>;
  totalNum$: Observable<number>;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
  ) {
    this.flights$ = this._store.select(selectFlights);
    this.loadedNum$ = this._store.select(selectFlightsLoadedNumber);
    this.totalNum$ = this._store.select(selectFlightsTotalNumber);
  }

  ngOnInit() {
    combineLatest([
      this._route.queryParams,
      this._route.data.pipe(filter(({ airports }) => airports)),
    ])
      .pipe(first())
      .subscribe(([{ startDate, endDate }, { airports }]) => {
        this._store.dispatch(
          loadAllFlights({
            startDate,
            endDate,
            combinations: (combinate(airports) as SingleAirportByPoint[]).slice(
              0,
              5,
            ),
          }),
        );
      });
  }
}
