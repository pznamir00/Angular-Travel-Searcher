import { dateToSimpleFormat } from './date.utils';

describe('date utils', () => {
  describe('dateToSimpleFormat', () => {
    it('converts date to simple format', () => {
      const date = new Date(2020, 4, 5);
      const result = dateToSimpleFormat(date);
      expect(result).toEqual('2020-05-05');
    });
  });
});
