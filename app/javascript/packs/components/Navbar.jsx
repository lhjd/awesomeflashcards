import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
              ¡Hola!
          </Typography>
          <Button color="inherit">
          </Button>
          <IconButton>
            <a rel="nofollow" data-method="delete" href="/users/sign_out">
              <Icon>exit_to_app</Icon>            
            </a>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
