import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const style = {
  margin: 12
}

const items = [
  'person1',
  'person2',
  'person3',
  'person4',
  'person5'
]

const PeopleList = props => {
  const { type } = props
  return (
    <div className="card-display">
      <RaisedButton label={type} style={style} secondary={true} />
      {items.map(item => {
        return (<Card key={item}>
          <CardHeader
            title={item}
            subtitle="Owner of project"
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            Description:
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>)
      })}
    </div>
  )
}

export default PeopleList
