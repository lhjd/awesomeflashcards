import React, { useContext } from 'react';
import { Context } from '../App';
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

    const classes = useStyles();

    const dispatch = useContext(Context);
    
    const handleClick = () => {
        dispatch({type: 'CHECK_ANSWER', payload: props.choice});
    }

    return (
        <Button variant="contained" color="primary" onClick={handleClick}>
          {props.choice}
        </Button>
    );


}