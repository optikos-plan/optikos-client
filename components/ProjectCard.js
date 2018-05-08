import React from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const ProjectCard = () => (
  <Card>
    <CardHeader
      title="This is a Project"
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
  </Card>
)

export default ProjectCard
