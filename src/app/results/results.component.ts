import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import combinate from 'combinate';
import { first } from 'rxjs';
import { AirportsByPoint } from './types/airports-by-point.type';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultsComponent implements OnInit, AfterViewInit {
  private _airportsByPoint: AirportsByPoint;
  // results$: Observable<any>;

  constructor(private _route: ActivatedRoute) {
    this._airportsByPoint = {
      origin: [],
      destination: [],
    };
  }

  ngOnInit() {
    this._route.data.pipe(first()).subscribe(({ airports }) => {
      this._airportsByPoint = airports;
    });
  }

  ngAfterViewInit(): void {
    const combinations = combinate<Record<number, AirportsByPoint[]>>(
      this._airportsByPoint as any,
    );
  }
}
