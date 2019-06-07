import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { combine, prepare } from '../src';

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
});
