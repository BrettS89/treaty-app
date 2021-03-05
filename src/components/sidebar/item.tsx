import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DesktopWindowsRoundedIcon from '@material-ui/icons/DesktopWindowsRounded';

const useStyles = makeStyles({
  typography: {
    marginLeft: 30,
  }
});

const Item = () => {
  const classes = useStyles();

  return (
    <div className="Sidebar-Item">
      <DesktopWindowsRoundedIcon />
      <Typography className={classes.typography}>
        Dashboard
      </Typography>
    </div>
  );
};

export default Item;
