import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = (props) => {
  
  let good = store.getState().good
  let ok = store.getState().ok
  let bad = Math.abs(store.getState().bad)
  let palautteita = good + ok + bad
  let avg = Math.floor((store.getState().good + store.getState().bad) / palautteita * 100) / 100
  let pos = Math.floor(good / palautteita * 1000) / 10
  if (palautteita === 0) {
    return (
      <div>
        <h2>Statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>Statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{pos} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={props.onClick('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    switch (nappi) {
      case 'GOOD':
        store.dispatch({ type: 'GOOD'})
        break
      case 'OK':
        store.dispatch({ type: 'OK'})
        break
      case 'BAD':
        store.dispatch({ type: 'BAD'})
        break
      case 'ZERO':
        store.dispatch({ type: 'ZERO'})
        break
      default:
    }
  }

  render() {
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka onClick={this.klik}/>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)