import * as React from 'react'

type ObjectKeys<State> = State & {
  [key: string]: any
}

export function combine<State, Action>(reducers: {
  [key: string]: (state: State, action: Action) => State
}) {
  return (state: ObjectKeys<State>, action: Action) =>
    Object.keys(reducers).reduce(
      (prev, current) => ({
        ...prev,
        [current]: reducers[current](state[current], action),
      }),
      {} as State
    )
}

export function prepare<State, Action>(
  reducer: React.Reducer<State, Action>,
  initialState: State
) {
  type Shape = [State, React.Dispatch<Action>]

  const Context = React.createContext<Shape | undefined>(undefined)

  function useShaph() {
    const value = React.useContext(Context) as Shape

    if (!value) {
      throw new Error('Component must be wrapped in Shaph Provider.')
    }

    return value
  }

  function Provider<Props>(props: React.PropsWithChildren<Props>) {
    const value = React.useReducer<React.Reducer<State, Action>>(
      reducer,
      initialState
    )

    Provider.prototype.__getContextValue = () => value

    return (
      <Context.Provider value={value} children={props.children} {...props} />
    )
  }

  return {
    useShaph,
    Provider,
  }
}
