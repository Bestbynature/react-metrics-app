import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { fetchHomeData } from '../redux/home/homeslice';

jest.mock('axios');

const mockStore = configureMockStore([thunk]);

describe('homeSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ home: {} });
  });

  it('should handle fetch home data error', async () => {
    const errorMessage = undefined;
    const errorResponse = { response: { data: errorMessage } };

    axios.all.mockRejectedValueOnce(errorResponse);

    await store.dispatch(fetchHomeData());

    const actions = store.getActions();
    expect(actions[0].type).toEqual('home/fetchHomeData/pending');
    expect(store.getState().home.error).toEqual(errorMessage);
  });
});
