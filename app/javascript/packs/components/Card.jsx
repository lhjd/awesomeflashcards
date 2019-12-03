import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from './Card.module.scss';
import classnames from 'classnames';
import { Context } from '../App';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';

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

const cx = classnames.bind(styles);

export default function Card(props) {

  const dispatch = useContext(Context);
  const [isEasy, setIsEasy] = useState(false);
  const [isHard, setIsHard] = useState(false);

  let {frontWord, backWord, flipped, flippable} = props;

  const classes = useStyles();

  const flipCardInner = cx(
    styles.flipCardInner, // styles that never change
    { // dynamic styles
      [styles.flipped]: flipped // make the key the style name, and the value the dynamic boolean
    }
  );

  const thumbsUp = cx(
    { // dynamic styles
      [styles.isEasy]: isEasy,// make the key the style name, and the value the dynamic boolean
    }
  );

  const thumbsDown = cx(
    { // dynamic styles
      [styles.isHard]: isHard// make the key the style name, and the value the dynamic boolean
    }
  );

  const backStyle = classnames(
    classes.root,
    classes.back
  );


  const handleClick = (flippable) => {
      if (flippable) {
        dispatch({ type: "FLIP" });
      }
  }

  const handleClickThumb = (event, type) => {
    // prevent the card from being flipped due to event bubbling
    event.stopPropagation();
    switch(type) {
      case 'easy':
        setIsEasy(!isEasy);
        setIsHard(false);
        const csrfToken = document.querySelector("meta[name=csrf-token]").content;
        axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
        axios.post('/words.json', {
          word: props.backWord,
          easy: !isEasy,
          hard: false,
          wordId: props.wordId
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log("*** error ***");
          console.log(error);
        });              
        break; 
      case 'hard':
        setIsHard(!isHard);
        setIsEasy(false);
        break; 
      default:
        throw new Error(":( Error in switch statement");
    }
  }

  return (

    <Box className={styles.flipCard} onClick={ () => handleClick(flippable)}>
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
            <IconButton 
            onClick={(event) => handleClickThumb(event, "easy")}>
              <Icon
                className={thumbsUp}
              >thumb_up</Icon>
            </IconButton>
            <IconButton onClick={(event) => handleClickThumb(event, "hard")}>
              <Icon 
              className={thumbsDown}>thumb_down</Icon>
            </IconButton>
          </Paper>          
        </Box>
      </Box>
    </Box>
  );
}
