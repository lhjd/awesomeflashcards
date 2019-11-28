import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: 100,
    height: 100,
  },
}));

export default function PaperSheet() {
  const classes = useStyles();

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center">
      <Paper className={classes.root}>
        <Typography 
          variant="h5"
          component="h3">
          Wow
        </Typography>
        {/* <Typography component="p">
        Paper can be used to build surface or other elements for your application.
      </Typography> */}
      </Paper>
    </Box>
  );
}
