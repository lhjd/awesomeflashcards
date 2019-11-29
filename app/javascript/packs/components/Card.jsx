import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: "50vw",
    height: "200px",
  },
}));

export default function PaperSheet(props) {

  const classes = useStyles();

  return (
    <Box
      // display="inline-block"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center">
      <Paper className={classes.root} elevation={24}>
        <Typography 
          variant="h5"
          component="h3">
          {props.word}
        </Typography>
      </Paper>
    </Box>
  );
}
