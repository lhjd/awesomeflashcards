import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { EasterEggContext } from './EasterEgg';
import MonsterImage from '../../../assets/images/monster.svg'
import Box from '@material-ui/core/Box';

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

const Taco = () => {
    const classes = useStyles();

    const [run, setRun] = useState(0);
    const [rand, setRand] = useState(getRandomInt(1, 5));
    const [show, setShow] = useState(false);

    const updateScore = useContext(EasterEggContext);

    const handleWow = () => {
        updateScore();
    }

    //https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    useEffect(() => {

        const interval = setInterval(() => {
            setRun(run => {
                if (run >= 5) {
                    return 0;
                } else {
                    return run + 1;
                }
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);


    return (
        <Paper className={classes.paper} elevation={24}>
            <Typography variant="h5" component="h3">
                {/* run: {run} */}
                {run === getRandomInt(1, 5) &&
                    // <div onClick={handleWow}>wow</div>
                    <Box display="flex" flexDirection="column" className="animated rubberBand">
                        <Box display="flex">
                            <img src={MonsterImage} width="50px" onClick={handleWow} />
                        </Box>
                        {/* <small>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></small> */}
                    </Box>                                    
                }
            </Typography>
        </Paper>
    );
}

export default Taco;