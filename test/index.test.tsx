import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { prepare, combine } from '../src';

function color(state: any, action: any) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      };

    case 'DO_SOMETHING':
      return state;

    default:
      return state;
  }
}

function name(state: any, action: any) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      };

    case 'DO_SOMETHING':
      return state;

    default:
      return state;
  }
}

const state = {
  color: {
    value: '#cc343d',
  },
  name: {
    value: 'semiDarkRed',
  },
};

describe('it', () => {
  it('creates Provider and renders without crashing', () => {
    const div = document.createElement('div');
    const { Provider } = prepare(state => state, { color: '#cc343d' });
    ReactDOM.render(
      <Provider>
        <p>Text</p>
      </Provider>,
      div
    );
  });

  it('creates combined reducer', () => {
    const rootReducer = combine({ color, name });
    const nextState = rootReducer(state, {
      type: 'SET_VALUE',
      payload: 'blue',
    });
    expect(nextState).toMatchObject({
      color: { value: 'blue' },
      name: { value: 'blue' },
    });
  });

  it('');
});
