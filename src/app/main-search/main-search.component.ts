import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GeolocationHttpService } from './services/geolocation-http.service';
import { MainSearchForm } from './types/main-search-form.type';

@Component({
  selector: 'app-main-search',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSearchComponent implements OnInit {
  form: MainSearchForm;

  constructor(
    private _fb: FormBuilder,
    private _geolocationHttpService: GeolocationHttpService,
  ) {
    this.form = this._fb.group({
      origin: new FormControl(''),
      destination: new FormControl(''),
      date: {
        from: new FormControl(new Date()),
        to: new FormControl(new Date()),
      },
    });
  }

  ngOnInit() {
    this._loadUserGeolocation();
  }

  private _loadUserGeolocation() {
    if ('navigator' in window) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        this._geolocationHttpService
          .getAddressByCoordinates(position.coords)
          .subscribe((result) => {
            console.log(result);
          });
      });
    }
  }
}
