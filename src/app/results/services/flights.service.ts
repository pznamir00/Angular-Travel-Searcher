import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlightsService {
  private _loading$ = new BehaviorSubject(true);
  loading$ = this._loading$.asObservable();

  constructor() {}

  setLoading(value: boolean) {
    this._loading$.next(value);
  }
}
