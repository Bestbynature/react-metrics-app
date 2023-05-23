import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'; // Import redux-thunk middleware
import Home from '../components/Home';
import { fetchHomeData } from '../redux/home/homeSlice';

const mockStore = configureStore([thunk]); // Apply middleware

jest.setTimeout(15000);

describe('Home component', () => {
  test('renders correctly', async () => {
    const store = mockStore({
      home: {
        data: [],
      },
    });

    // Dispatch the asynchronous action
    await store.dispatch(fetchHomeData());

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
