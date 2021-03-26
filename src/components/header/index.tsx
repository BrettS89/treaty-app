import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import LandscapeRoundedIcon from '@material-ui/icons/LandscapeRounded';
import useStyles from './styles';

const Header = (props: any) => {
  const classes = useStyles();

  return (
    <AppBar elevation={1} color="primary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.leftItems} onClick={() => props.history.push('/')}>
          <LandscapeRoundedIcon style={{ fontSize: 44, color: 'white', paddingBottom: 1 }} />
          <Typography variant="h5" className={classes.logo}>
            Treaty
          </Typography>
        </div>

        <div className={classes.rightItems}>
          <Button
            color="secondary"
            variant="outlined"
            size="large"
            onClick={() => props.history.push('/login')}
          >
            Log in
          </Button>
        </div>
        
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
