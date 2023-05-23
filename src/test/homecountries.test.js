import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Homecountries from '../components/Homecountries';
import { setCountry } from '../redux/details/detailsSlice';

const mockStore = configureStore([]);

describe('Homecountries component', () => {
  test('renders correctly and dispatches setCountry action on button click', () => {
    const country = 'BOLIVIA';
    const load = {
      Area: 123,
      Capital: 'La Paz',
      Population: 1000000,
      'Official Flag': 'bolivia_flag.png',
    };

    const store = mockStore({});

    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Homecountries country={country} load={load} />
        </BrowserRouter>
      </Provider>,
    );

    const button = getByText('BOLIVIA');

    expect(getByText('Area: 123')).toBeInTheDocument();
    expect(getByText('Capital: La Paz')).toBeInTheDocument();
    expect(getByText('Population: 1000000')).toBeInTheDocument();
    expect(getByAltText('Official Flag')).toBeInTheDocument();
    fireEvent.click(button);
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual(setCountry(['BOLIVIA', load]));
  });
});
