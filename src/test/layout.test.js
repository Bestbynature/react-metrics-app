import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../components/Header';

const mockStore = configureStore([]);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  it('renders the header components', () => {
    const initialState = {
      details: {
        header: {
          first: 'First Title',
          second: 'Second Title',
        },
      },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByText('First Title')).toBeInTheDocument();
    expect(screen.getByText('Second Title')).toBeInTheDocument();

  });

  it('calls the backHandler function when the back button is clicked', () => {
    const initialState = {
      details: {
        header: {
          first: 'First Title',
          second: 'Second Title',
        },
      },
    };

    const store = mockStore(initialState);
    const mockBackHandler = jest.fn();
    jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockBackHandler);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByTestId('back-button'));
    expect(mockBackHandler).toHaveBeenCalled();
  });
});
