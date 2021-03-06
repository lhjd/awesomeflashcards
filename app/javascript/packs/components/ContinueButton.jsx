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

export default function ContinueButton() {
  const classes = useStyles();

  const dispatch = useContext(Context);

  const handleClick = () => {
        dispatch({ type: "NEXT_WORD" });
        dispatch({ type: "PROGRESS" });
  }
  

  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Continue
      </Button>
    </div>
  );
}
