import { waitFor } from '@testing-library/angular';
import { of } from 'rxjs';
import { InputWithCoordsDirective } from './input-with-coords.directive';

describe('Directive: InputWithCoords', () => {
  it('throws an error on init if control is missing', () => {
    try {
      setup(true);
      throw new Error('error should have been thrown');
    } catch (error: any) {
      expect(error.message).toEqual(
        'appInputWithCoords can be only attached to form control',
      );
    }
  });

  it('updates text by coordinates', async () => {
    const el: any = {};
    //@ts-ignore
    document.createElement = jest.fn(() => el);
    setup();
    await waitFor(() => expect(el.innerText).toEqual('lat: 34.50, lon: 21.23'));
  });
});

const setup = (missingControl = false) => {
  const ngControl: any = {
    control: missingControl
      ? undefined
      : {
          metadata: {
            coords: {
              latitude: 34.5,
              longitude: 21.23,
            },
          },
          statusChanges: of({}),
        },
  };
  const elementRef: any = {
    nativeElement: {
      append: jest.fn(),
    },
  };
  const directive = new InputWithCoordsDirective(ngControl, elementRef);
  directive.ngOnInit();
  return directive;
};
