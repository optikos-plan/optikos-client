import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Main from './Main'

const client = new ApolloClient({
  // uri: 'http://localhost:3999/graphql'
  uri: 'https://optikos-gql.herokuapp.com/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider>
      <Router>
        <Main />
      </Router>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('app')
)
