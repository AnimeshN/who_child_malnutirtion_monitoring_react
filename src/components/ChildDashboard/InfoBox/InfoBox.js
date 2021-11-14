import React from 'react';
import { Typography,Card ,CardContent} from '@material-ui/core';
import './InfoBox.css';
export const Infobox = ({type,value}) => {


    return (
    <Card className='card' >
      <CardContent>
        <Typography  color="textPrimary" gutterBottom>
          {type}
        </Typography>
       
        <Typography  color="textSecondary">
          {value}
        </Typography>
        </CardContent>
    </Card>
    )
    return <div>{type}:{value}</div>
}