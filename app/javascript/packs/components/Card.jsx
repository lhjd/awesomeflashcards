import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './Card.module.scss';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    width: "50vw",
    height: "200px",
  },
}));

const cx = classnames.bind(styles)

export default function PaperSheet(props) {

  let {frontWord, backWord} = props;

  const classes = useStyles();

  const [flipped, setFlipped] = useState(false);

  const flipCardInner = cx(
    styles.flipCardInner, // styles that never change
    { // dynamic styles
      [styles.flipped]: flipped // make the key the style name, and the value the dynamic boolean
    }
  )

  const handleClick = () => {
    setFlipped(!flipped);
  }

  return (


    <Box className={styles.flipCard} onClick={handleClick}>
      <Box className={flipCardInner}>
        <Box className={styles.flipCardFront}>
          <Paper className={classes.root} elevation={24}>
            <Typography variant="h5" component="h3">
              {frontWord}
            </Typography>
          </Paper>
        </Box>
        <Box className={styles.flipCardBack}>
          <Paper className={classes.root} elevation={24}>
            <Typography variant="h5" component="h3">
              {backWord}
            </Typography>
          </Paper>          
        </Box>
      </Box>
    </Box>
  );
}
