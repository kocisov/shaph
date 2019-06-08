import * as React from 'react'
import * as ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import { prepare, combine } from '../src'

function color(state: any, action: any) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      }

    case 'DO_SOMETHING':
      return state

    default:
      return state
  }
}

function name(state: any, action: any) {
  switch (action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        value: action.payload,
      }

    case 'DO_SOMETHING':
      return state

    default:
      return state
  }
}

const state = {
  color: {
    value: '#cc343d',
  },
  name: {
    value: 'semiDarkRed',
  },
}

describe('it', () => {
  it('creates Provider and renders without crashing', () => {
    const div = document.createElement('div')
    const { Provider } = prepare((state) => state, { color: '#cc343d' })
    ReactDOM.render(
      <Provider>
        <p>Text</p>
      </Provider>,
      div
    )
    ReactDOM.unmountComponentAtNode(div)
  })

  it('provides correct value from useShaph', () => {
    const { useShaph, Provider } = prepare((state) => state, state)
    function View() {
      const [state] = useShaph()
      return <>{state.color.value}</>
    }
    const element = renderer.create(
      <Provider>
        <View />
      </Provider>
    )
    const tree = element.toJSON()
    expect(tree).toBe('#cc343d')
  })

  it('throws from useShaph if Shaph Provider is not found', () => {
    const { useShaph } = prepare((state) => state, state)
    function View() {
      const [state] = useShaph()
      return <>{state.color.value}</>
    }
    expect(() => renderer.create(<View />)).toThrowError(
      'Component must be wrapped in Shaph Provider'
    )
  })

  it('provides context value from unstable __getContextValue', () => {
    const { Provider } = prepare((state) => state, state)
    renderer.create(<Provider />)
    expect(Provider.prototype.__getContextValue()[0]).toBe(state)
  })

  it('creates combined reducer', () => {
    const rootReducer = combine({ color, name })
    const nextState = rootReducer(state, {
      type: 'SET_VALUE',
      payload: 'blue',
    })
    expect(nextState).toMatchObject({
      color: { value: 'blue' },
      name: { value: 'blue' },
    })
  })
})
