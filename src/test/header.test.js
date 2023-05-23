import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Header from '../components/Header';

const mockStore = configureStore([]);

describe('Header component', () => {
  test('renders Header component', () => {
    const initialState = {
      details: {
        header: {
          first: 'First Header',
          second: 'Second Header',
        },
      },
    };

    const store = mockStore(initialState);

    const { container, getByTestId } = render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>,
    );

    expect(container).toMatchSnapshot();

    const backButton = getByTestId('back-button');
    fireEvent.click(backButton);
  });
});
