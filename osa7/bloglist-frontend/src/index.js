import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import { BrowserRouter as Router } from 'react-router-dom'

// Switch, Route, Link

const store = createStore(notificationReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)