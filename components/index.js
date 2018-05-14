import '@tmkelly28/tk-css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Main from './Main'

// const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:3999/graphql'
const GRAPHQL_URI = 'https://optikos-gql.herokuapp.com/graphql'

const client = new ApolloClient({
  uri: GRAPHQL_URI
})
// console.log('GRAPHQL_URI', GRAPHQL_URI)
// console.dir(process.env)

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
