import React, { Component } from 'react'
import Divider from 'material-ui/Divider'
import {List, ListItem} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render () {
    const {taskSelected, taskCompleted, updateTaskCompleted} = this.props;

  if (taskSelected){
    console.log("task selected")
    return (
      <div className="sidenav">
        <h4>Task Name</h4>
        <Checkbox
          label="Completed"
          checked={taskCompleted}
          onCheck={updateTaskCompleted}
          style={styles.checkbox}
          labelStyle={styles.label}
          iconStyle={{fill: '#424242'}}
        />

        <DatePicker
          hintText="Set deadline"
          underlineStyle={{display: 'none'}}
          hintStyle={{color: '#424242'}}
        />
        <TextField
          hintStyle={{color: '#424242'}}
          hintText="Set owner"
          underlineStyle={{display: 'none'}} /><br />
        <TextField
          inputStyle={{color: '#424242'}}
          hintStyle={{color: '#424242'}}
          underlineStyle={{display: 'none'}}
          hintText="Enter comments"
          multiLine={true}
          rows={1}
          rowsMax={4}
        /><br /><br />
        <div>
        <RaisedButton label="SUBMIT" primary={true} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="sidenav">
      <List >
        <ListItem style={{color: '#424242'}} primaryText="Completed Tasks" />
        <ListItem style={{color: '#424242', fontSize: '12px'}} primaryText="Completed Task 1" />
        <ListItem style={{color: '#424242', fontSize: '12px'}} primaryText="Completed Task 2" />
      </List>
      <Divider  />
      <List>
        <ListItem style={{color: '#424242'}} primaryText="Current Tasks"  />
        <ListItem style={{color: '#424242', fontSize: '12px'}} primaryText="Current Task 1" />
        <ListItem style={{color: '#424242', fontSize: '12px'}} primaryText="Current Task 2" />
      </List>
      <Divider />
      <List>
        <ListItem style={{color: '#424242'}} primaryText="Future Tasks" />
        <ListItem style={{color: '#424242', fontSize: '12px'}} primaryText="Future Task 1" />
        <ListItem style={{color: '#424242', fontSize: '12px'}} primaryText="Future Task 2" />
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
  },
  label: {
    color: '#424242'
  }
};

export default Sidebar
