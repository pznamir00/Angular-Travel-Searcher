import { FormControl, FormGroup } from '@angular/forms';

export type MainSearchForm = FormGroup<{
  origin: FormControl<string | null>;
  destination: FormControl<string | null>;
  date: FormControl<{
    from: FormControl<Date | null>;
    to: FormControl<Date | null>;
  } | null>;
}>;

export type MainSearch = MainSearchForm['value'];
