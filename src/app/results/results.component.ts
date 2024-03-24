import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import combinate from 'combinate';
import { first } from 'rxjs';
import { loadAllFlights, resetFlights } from '../store/flights/flights.action';
import { SingleAirportByPoint } from './types/airports-by-point.type';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit, OnDestroy {
  constructor(
    private _route: ActivatedRoute,
    private _store: Store,
  ) {}

  ngOnInit() {
    this._route.data
      .pipe(first())
      .subscribe(({ airports, startDate, endDate }) => {
        const combinations = combinate(airports) as SingleAirportByPoint[];
        this._store.dispatch(
          loadAllFlights({
            startDate,
            endDate,
            combinations,
          }),
        );
      });
  }

  ngOnDestroy(): void {
    this._store.dispatch(resetFlights());
  }
}
