import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './Card.module.scss';
import classnames from 'classnames';
import { Context } from '../App';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(3, 2),
    width: "200px",
    height: "200px",
    borderRadius: "20px",
  },

  back: {
    background: '#ccff90'
  }
}));

const cx = classnames.bind(styles)

export default function Card(props) {

  const dispatch = useContext(Context);

  let {frontWord, backWord, flipped} = props;

  const classes = useStyles();

  const flipCardInner = cx(
    styles.flipCardInner, // styles that never change
    { // dynamic styles
      [styles.flipped]: flipped // make the key the style name, and the value the dynamic boolean
    }
  );

  const backStyle = classnames(
    classes.root,
    classes.back
  );


  const handleClick = () => {
    dispatch({ type: "FLIP" });
  }

  const handleLike = (event) => {
    console.log("like it!!");
    event.stopPropagation();
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
          <Paper className={backStyle} elevation={24}>
            <Typography variant="h5" component="h3">
              {backWord}
            </Typography>
            <IconButton onClick={handleLike}>
              <Icon>thumb_up</Icon>
            </IconButton>
            <IconButton onClick={handleLike}>
              <Icon>thumb_down</Icon>
            </IconButton>
          </Paper>          
        </Box>
      </Box>
    </Box>
  );
}
