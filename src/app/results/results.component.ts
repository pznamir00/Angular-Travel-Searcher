import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { FlightsService } from './services/flights.service';
import { SingleAirportByPoint } from './types/airports-by-point.type';
import { Flight } from './types/flights-result.type';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit, OnDestroy {
  flights$: Observable<Flight[]>;
  loadedNum$: Observable<number>;
  totalNum$: Observable<number>;
  loading$: Observable<boolean>;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
    private _flightsService: FlightsService,
  ) {
    this.flights$ = this._store.select(selectFlights);
    this.loadedNum$ = this._store.select(selectFlightsLoadedNumber);
    this.totalNum$ = this._store.select(selectFlightsTotalNumber);
    this.loading$ = this._flightsService.loading$;
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
            combinations: combinate(airports) as SingleAirportByPoint[],
          }),
        );
      });
  }

  ngOnDestroy(): void {}
}
