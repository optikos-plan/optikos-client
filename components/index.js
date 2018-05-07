import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Provider} from 'react-redux'
import store from './store'
import Main from './Main'

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <Main />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
)
