import React from "react";

type ObjectKeys<State> = State & {
  [key: string]: any;
};

export function combine<S, A>(reducers: {
  [key: string]: (state: S, action: A) => S;
}) {
  return (state: ObjectKeys<S>, action: A) =>
    Object.keys(reducers).reduce(
      (prev, current) => ({
        ...prev,
        [current]: reducers[current](state[current], action),
      }),
      {} as S
    );
}

export function prepare<S, A>(reducer: React.Reducer<S, A>, initialState: S) {
  type Shape = [S, React.Dispatch<A>];

  const Context = React.createContext<Shape | undefined>(undefined);

  function useShaph() {
    const value = React.useContext(Context) as Shape;

    if (!value) {
      throw new Error("Component must be wrapped in Shaph Provider.");
    }

    return value;
  }

  function Provider<Props>(props: React.PropsWithChildren<Props>) {
    const value = React.useReducer<React.Reducer<S, A>>(reducer, initialState);
    return (
      <Context.Provider value={value} children={props.children} {...props} />
    );
  }

  return {
    useShaph,
    Provider,
  };
}
