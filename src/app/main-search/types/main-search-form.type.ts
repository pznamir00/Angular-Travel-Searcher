import { FormControl, FormGroup } from '@angular/forms';
import { LatLon } from './geolocation.type';

export type MainSearchForm = FormGroup<{
  origin: FormControl<string | null>;
  destination: FormControl<string | null>;
  date: FormGroup<{
    from: FormControl<Date | null>;
    to: FormControl<Date | null>;
  }>;
}>;

export type MainSearch = MainSearchForm['value'];

export interface PlacesCoordsMetadata {
  origin: LatLon | null;
  destination: LatLon | null;
}
