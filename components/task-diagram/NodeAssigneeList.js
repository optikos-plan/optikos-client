import React from 'react'
import {List, ListItem} from 'material-ui/List'
import nameToInitial from '../../utils/nameToInitial'

const NodeAssigneeList = () => (
  <List
    style={{
      width: '100%'
    }}
  >
    <ListItem
      primaryText={
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <h1
            style={{
              width: '10%'
            }}
          >
            {nameToInitial('Place Holder')}
          </h1>
          <h3>Place Holder</h3>
        </div>
      }
    />
  </List>
)

export default NodeAssigneeList
