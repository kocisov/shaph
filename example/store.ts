import { prepare, combine } from '../.'

type User = {
  name: string
  age: number
}

type Message = {
  text: string
  published: Date
}

type State = {
  user: User
  message: Message
}

type Action = {
  type: string
  payload?: any
}

function user<S>(state: S, action: Action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.payload,
      }

    case 'SET_AGE':
      return {
        ...state,
        age: action.payload,
      }

    default:
      return state
  }
}

function message<S>(state: S, action: Action) {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        text: action.payload,
      }

    case 'SET_PUBLISHED':
      return {
        ...state,
        published: action.payload,
      }

    default:
      return state
  }
}

const rootReducer = combine<State, Action>({ user, message })

const initialState = {
  user: {
    name: 'Marty',
    age: 10,
  },
  message: {
    text: 'Is this working?',
    published: new Date(),
  },
}

export const { useShaph, Provider } = prepare<State, Action>(
  rootReducer,
  initialState
)
