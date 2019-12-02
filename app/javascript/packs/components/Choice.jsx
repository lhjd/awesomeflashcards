import React, { useContext } from 'react';
import { Context } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

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
        dispatch({type: 'CHECK_ANSWER', 
                  payload: {choice: props.choice,
                            choiceIndex: props.choiceIndex}});
    }

    return (
        <Box m={1}>
            <Button 
                variant="contained" 
                color={props.color} 
                onClick={handleClick}
                >
              {props.choice}
            </Button>
        </Box>
    );


}