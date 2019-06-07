# Shaph [![Build Status](https://travis-ci.org/Kocisov/shaph.svg?branch=master)](https://travis-ci.org/Kocisov/shaph)

> Redux like State Management with Hooks and Context

## Installation

```bash
# install via npm
$ npm install shaph
# or yarn
$ yarn add shaph
```

## Usage

```js
import React from 'react';
import { render } from 'react-dom';
import { combine, prepare } from 'shaph';

const state = {
  view: {
    theme: 'light',
  },
  user: {
    authenticated: false,
    cool: true,
    name: undefined,
  },
};

function view(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
      };

    default:
      return state;
  }
}

function user(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        authenticated: true,
        name: action.payload.name,
      };

    default:
      return state;
  }
}

const rootReducer = combine({
  user,
  view,
});

const { Provider, useShaph } = prepare(rootReducer, state);

function View() {
  const [state] = useShaph();

  return (
    <div className={state.view.theme}>
      {state.user.authenticated && <h2>Hello, {state.user.name}</h2>}
    </div>
  );
}

render(
  <Provider>
    <View />
  </Provider>,
  document.getElementById('root')
);
```

#### Shaph is also written in TypeScript providing Types for better Developer Experience

```ts
combine<State, Action>({ ...reducers });
prepare<State, Action>(reducer, initialState);
const ProviderWithProps = Provider<Props>
```
