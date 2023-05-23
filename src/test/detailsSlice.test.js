import detailsReducer, { setCountry, setHeader } from '../redux/details/detailsSlice';

describe('detailsSlice', () => {
  test('setCountry action should update the state correctly', () => {
    const initialState = {
      country: '',
      countryData: {},
      header: {
        first: '2023',
        second: 'Brief Overview',
      },
    };

    const load = { name: 'Bolivia' };

    const expectedState = {
      country: 'BOLIVIA',
      countryData: { name: 'Bolivia' },
      header: {
        first: '',
        second: 'country details',
      },
    };

    const newState = detailsReducer(initialState, setCountry(['BOLIVIA', load]));
    expect(newState).toEqual(expectedState);
  });

  test('setHeader action should update the state correctly', () => {
    const initialState = {
      country: 'BOLIVIA',
      countryData: { name: 'Bolivia' },
      header: {
        first: '',
        second: 'country details',
      },
    };

    const expectedState = {
      country: 'BOLIVIA',
      countryData: { name: 'Bolivia' },
      header: {
        first: '2023',
        second: 'Brief Overview',
      },
    };

    const newState = detailsReducer(initialState, setHeader());
    expect(newState).toEqual(expectedState);
  });
});
