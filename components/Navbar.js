import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import DropDownMenu from 'material-ui/DropDownMenu'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar'
import { NavLink } from 'react-router-dom'

export default class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 3
    }
  }

  handleChange = (event, index, value) => this.setState({ value })

  render() {
    return (

      <Toolbar style={{ backgroundColor: "#0C365F" }}>
        <ToolbarGroup className="three-width">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
            <ToolbarTitle text="Optikos" style={{ color: "white" }} />
            <FontIcon className="muidocs-icon-custom-sort" />
          </NavLink>

        </ToolbarGroup>
        <ToolbarGroup className="three-width">
          <NavLink to="/projects/1">
            <RaisedButton style={{margin: "10px"}} label="Project Plan" />
          </NavLink>
          <NavLink to="/people">
            <RaisedButton style={{margin: "10px"}}  label="People" />
          </NavLink>
        </ToolbarGroup>
        <ToolbarGroup className="three-width" />
      </Toolbar>
    )
  }
}
