import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'

class Sidebar extends Component {
  constructor() {
    super()
    this.updateCheck = this.updateCheck.bind(this)
  }

  updateCheck(event) {

  }


  render () {
    const {taskSelected, taskCompleted, updateTaskCompleted} = this.props;

  if (taskSelected){
    return (
      <div className="sidenav">
        <h3>Task Name</h3>
        <Checkbox
          label="Completed"
          checked={taskCompleted}
          onCheck={updateTaskCompleted}
          style={styles.checkbox}
        />

        <DatePicker hintText="Set deadline" underlineStyle={{display: 'none'}} />
        <TextField hintText="Set owner" underlineStyle={{display: 'none'}} /><br />
        <TextField
          underlineStyle={{display: 'none'}}
          hintText="Enter comments"
          multiLine={true}
          rows={1}
          rowsMax={4}
        /><br />
      </div>
    )
  } else {
    return (
      <div className="sidenav">
      <List >
        <ListItem style={{color: 'white'}} primaryText="Completed Tasks" />
        <ListItem style={{color: '#E0E0E0', fontSize: '12px'}} primaryText="Completed Task 1" />
        <ListItem style={{color: '#E0E0E0', fontSize: '12px'}} primaryText="Completed Task 2" />
      </List>
      <Divider  />
      <List>
        <ListItem style={{color: 'white'}} primaryText="Current Tasks"  />
        <ListItem style={{color: '#E0E0E0', fontSize: '12px'}} primaryText="Current Task 1" />
        <ListItem style={{color: '#E0E0E0', fontSize: '12px'}} primaryText="Current Task 2" />
      </List>
      <Divider />
      <List>
        <ListItem style={{color: 'white'}} primaryText="Future Tasks" />
        <ListItem style={{color: '#E0E0E0', fontSize: '12px'}} primaryText="Future Task 1" />
        <ListItem style={{color: '#E0E0E0', fontSize: '12px'}} primaryText="Future Task 2" />
      </List>
      </div>
    )
  }
  }

}

const styles = {
  block: {
    maxWidth: 250,
  },
  checkbox: {
    marginBottom: 16,
  }
};

export default Sidebar
