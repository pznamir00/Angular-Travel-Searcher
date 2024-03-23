import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NbCalendarRange } from '@nebular/theme';

export function bothDatesRequired(
  control: AbstractControl<NbCalendarRange<Date> | null>,
): ValidationErrors | null {
  return control?.value?.start && control.value.end
    ? null
    : { dates: 'Both dates are required' };
}
