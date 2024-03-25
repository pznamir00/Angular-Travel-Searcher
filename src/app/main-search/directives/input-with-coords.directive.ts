import { Directive, ElementRef, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs';
import { LatLon } from '../types/geolocation.type';

@UntilDestroy()
@Directive({
  selector: '[appInputWithCoords]',
})
export class InputWithCoordsDirective implements OnInit {
  private _coordsTextEl!: HTMLElement;

  constructor(
    @Self() private _control: NgControl,
    private _el: ElementRef<HTMLElement>,
  ) {}

  ngOnInit(): void {
    if (!this._control.control) {
      throw new Error(
        'appInputWithCoords can be only attached to form control',
      );
    }

    this._coordsTextEl = document.createElement('p');
    this._el.nativeElement.append(this._coordsTextEl);
    this._updateCoordsText(null);

    this._control.control.statusChanges
      ?.pipe(
        untilDestroyed(this),
        map(() => this._control.control?.metadata?.coords),
      )
      .subscribe((coords) => this._updateCoordsText(coords as LatLon | null));
  }

  private _updateCoordsText(coords: LatLon | null) {
    this._coordsTextEl.innerText = coords
      ? `lat: ${coords.latitude.toFixed(2)}, lon: ${coords.longitude.toFixed(2)}`
      : 'no coordinates';
  }
}
