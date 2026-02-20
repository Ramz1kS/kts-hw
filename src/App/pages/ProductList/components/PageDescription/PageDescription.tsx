import React from 'react'
import classes from './PageDescription.module.scss'
import Text from 'components/Text'

interface PageDescriptionProps {
    name: string,
    description: string
}

const PageDescription: React.FC<PageDescriptionProps> = ({name, description}) => {
  return (
    <div className={classes.textContainer}>
      <Text className={classes.bigName} weight='bold'>{name}</Text>
      <Text className={classes.description} color='secondary' view='p-20'>{description}</Text>
    </div>
  )
}

export default PageDescription
