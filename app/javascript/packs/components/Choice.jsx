import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  
export default function Choice(props) {

    console.log("*** props.choices ***", props.choices);
    
    const classes = useStyles();

    const handleClick = () => {
        console.log("choice clicked!!")
    }

    return (
        <Button variant="contained" color="primary" onClick={handleClick}>
          {props.choice}
        </Button>
    );


}