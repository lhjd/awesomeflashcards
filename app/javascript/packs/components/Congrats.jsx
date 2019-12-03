import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CongratsImage from '../../../assets/images/congrats.svg';
import Grid from '@material-ui/core/Grid';
import { Context } from '../App';

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 200,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  const dispatch = useContext(Context);

  const handleClick = () => {
    console.log("restart!");
    dispatch({ type: "RESTART" });
  }

  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '50vh' }}
   >
    <Grid item xs={12}>
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={CongratsImage}
          title="Congratulations!"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Congrats!
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <small>
            Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
            </small>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleClick}>
          Restart
        </Button>
      </CardActions>
    </Card>
    </Grid>      
   </Grid>
  
  );
}