import React, { Component } from 'react'
import Navbar from '../Navbar'
import PeopleList from './PeopleList'

export default class AllPeople extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="allPeople">
        <Navbar />
        <PeopleList type="ADD NEW PERSON" />
      </div>
    )
  }
}
