import React from 'react'
import moment from 'moment'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import DatePicker from 'material-ui/DatePicker'

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const SET_DATE = gql`
  mutation setEndDate($id: ID!, $date: String!) {
    updateTaskEndDate(id: $id, date: $date) {
      id
    }
  }
`

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor: 'rgb(223, 223, 27)',
    headerColor: 'steelblue'
  },
  textField: {
    className: 'nodeDatePop'
  }
})

const picker = ({ node, dueDate }) => (
  <div
    className="nodeDatePicker"
    style={{
      position: 'absolute',
      top: 65,
      left: 8,
      height: '1rem'
    }}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <DatePicker
        id={node.task.id.toString()}
        formatDate={date => moment(date).format('MMM Do YYYY')}
        hintText={
          dueDate ? (
            moment(dueDate).format('MMM Do YYYY')
          ) : (
            <span className="nodeDatePop">Enter Due Date</span>
          )
        }
        container="inline"
        onChange={(_, date) =>
          node.nodePersistDate(node, moment(date).format('YYYY-MM-DD'))
        }
      />
    </MuiThemeProvider>
  </div>
)

export default picker
