import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ProjectCard from './ProjectCard'
import PeopleCard from './PeopleCard'

const style = {
  margin: 12
}

const items = [
  'project1',
  'project2',
  'project3',
  'project4',
  'project5'
]

const type = 'projects'

const GenericCard = props => {
  // const { type, items } = props
  return (
    <div className="card-display">
      <RaisedButton label="Add a New Something" style={style} />
      {items.map(item => {
        return type === 'projects' ?
        <ProjectCard item={item} />
        : <PeopleCard item={item} />
      })}
    </div>
  )
}

export default GenericCard
