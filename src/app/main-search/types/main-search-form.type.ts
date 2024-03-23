import { FormControl, FormGroup } from '@angular/forms';
import { NbCalendarRange } from '@nebular/theme';
import { LatLon } from './geolocation.type';

export type MainSearchForm = FormGroup<{
  origin: FormControl<string | null>;
  destination: FormControl<string | null>;
  dates: FormControl<NbCalendarRange<Date> | null>;
}>;

export type MainSearch = MainSearchForm['value'];

export interface PlacesCoordsMetadata {
  origin: LatLon | null;
  destination: LatLon | null;
}
