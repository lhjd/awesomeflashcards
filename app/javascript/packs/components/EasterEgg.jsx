import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Taco from './Taco';
import MonsterImage from '../../../assets/images/monster.svg'
import StopWatchImage from '../../../assets/images/stopwatch.svg'
import Box from '@material-ui/core/Box';

export const EasterEggContext = React.createContext(null);

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 100,
        width: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
}));

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const EasterEgg = () => {
    const classes = useStyles();

    const dispatch = useContext(Context);

    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30);

    const handleClick = () => {
        dispatch({ type: "SHOW_QUIZ" });
    }

    //https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => {

                if (timer === 0) {
                    clearInterval(interval);
                    return 0;
                } else {
                    return timer - 1;
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const updateScore = () => {
        console.log("update score!");
        setScore(score => score + 1);
    }

    return (
        <>
            <EasterEggContext.Provider value={updateScore}>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            <Grid item>
                                <Typography variant="h5" component="h3">
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                        <Box display="flex" p={2}>
                                            <img src={MonsterImage} width="50px"/>
                                        </Box>
                                        <Box display="flex" p={2}>
                                            {score}
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                        <Box display="flex" p={2}>
                                            <img src={StopWatchImage} width="50px"/>
                                        </Box>
                                        <Box display="flex" p={2}>
                                            {timer}
                                        </Box>
                                    </Box>
                                </Typography>
                            </Grid>
                        </Grid>
                        {timer === 0
                            ?
                            <Grid container justify="center" spacing={2}>
                                <Grid item>
                                    <Typography variant="h5" component="h3">
                                        Game Over
                            </Typography>
                                </Grid>
                            </Grid>
                            :
                            <Grid container justify="center" spacing={1}>
                                {[...Array(10).keys()].map(value => (
                                    <Grid key={value} item>
                                        <Taco />
                                    </Grid>
                                ))}
                            </Grid>
                        }
                        <div style={{ padding: 20 }}>
                            <Grid container justify="center" spacing={2} >
                                <Grid item>
                                    <Button variant="contained" color="primary" onClick={handleClick}>
                                        Return
                                </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </ EasterEggContext.Provider>
        </>
    );
}

export default EasterEgg;