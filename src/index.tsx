import * as React from 'react';

export function combine<State, Action>(reducers: {
  [key: string]: (state: State, action: Action) => State;
}) {
  return (state: State & { [key: string]: any }, action: Action) => {
    const keys = Object.keys(reducers);

    return keys.reduce(
      (prev, current) => ({
        ...prev,
        [current]: reducers[current](state[current], action),
      }),
      {} as State
    );
  };
}

export function prepare<State, Action>(
  reducer: React.Reducer<State, Action>,
  initialState: State
) {
  type Shape = [State, React.Dispatch<Action>];

  const Context = React.createContext<Shape | undefined>(undefined);

  function useShaph() {
    return React.useContext(Context) as Shape;
  }

  function Provider<Props>(props: React.PropsWithChildren<Props>) {
    const value = React.useReducer<React.Reducer<State, Action>>(
      reducer,
      initialState
    );

    return (
      <Context.Provider value={value} children={props.children} {...props} />
    );
  }

  return {
    useShaph,
    Provider,
  };
}
