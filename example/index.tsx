import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { prepare, combine } from '../.'

type User = {
  name: string
}

function user<User>(state: User, action: Action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      }

    default:
      return state
  }
}

type Message = {
  text: string
}

function message<Message>(state: Message, action: Action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        text: action.payload,
      }

    default:
      return state
  }
}

const rootReducer = combine<State, Action>({ user, message })
const initialState = {
  user: {
    name: 'Shaph',
  },
  message: {
    text: 'Is this working?',
  },
}

type State = {
  user: User
  message: Message
}

type Action = {
  type: string
  payload?: any
}

const { useShaph, Provider } = prepare<State, Action>(rootReducer, initialState)

const App = () => {
  const [state, dispatch] = useShaph()

  function reverseName() {
    dispatch({
      type: 'SET_NAME',
      payload: state.user.name
        .split('')
        .reverse()
        .join(''),
    })
  }

  return (
    <div>
      <h2>Testing SHAPH</h2>
      <p>{state.user.name}</p>
      <p>{state.message.text}</p>
      <button onClick={reverseName}>click</button>
    </div>
  )
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
