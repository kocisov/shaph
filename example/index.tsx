import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useShaph, Provider } from './store'

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
