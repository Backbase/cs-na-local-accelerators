import { createMocks } from '@backbase/foundation-ang/data-http';
import { Provider } from '@angular/core';

/**
 * Mocks provider for /transfers-restricted-dates/restricted-dates URL pattern
 */
export const RestrictedDatesHttpServiceRestrictedDatesGetMocksProvider: Provider = createMocks([
  {
    urlPattern: '/transfers-restricted-dates/restricted-dates',
    method: 'GET',
    responses: [
      {
        status: 200,
        body: {
          $ref: 'examples/body/restricted-dates-get.json',
        },
      },
    ],
  },
]);

export const RestrictedDatesHttpServiceMocksProvider: Provider = createMocks([
  {
    urlPattern: '/transfers-restricted-dates/restricted-dates',
    method: 'GET',
    responses: [
      {
        status: 200,
        body: {
          startDate: makeOffsetDate(-2),
          endDate: makeOffsetDate(14),
          restrictedDates: [makeOffsetDate(4), makeOffsetDate(5), makeOffsetDate(6)],
        },
      },
    ],
  },
]);

function makeOffsetDate(daysOffset: number) {
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + daysOffset);

  let month = targetDate.getUTCMonth() + 1;
  let day = targetDate.getUTCDate();
  let year = targetDate.getUTCFullYear();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
