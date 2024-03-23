import { FormControl } from '@angular/forms';
import { bothDatesRequired } from './both-dates-required.validator';

describe('Both dates required validator', () => {
  it('returns error if value is null', () => {
    const control = new FormControl(null);
    //@ts-ignore
    expect(bothDatesRequired(control)).toBeTruthy();
  });

  it('returns error if end date is missing', () => {
    const control = new FormControl({ start: new Date() });
    //@ts-ignore
    expect(bothDatesRequired(control)).toBeTruthy();
  });

  it('returns no error if value has both start and end date', () => {
    const control = new FormControl({ start: new Date(), end: new Date() });
    //@ts-ignore
    expect(bothDatesRequired(control)).toBeFalsy();
  });
});
