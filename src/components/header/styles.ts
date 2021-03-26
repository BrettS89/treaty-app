import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  appBar: {
    // height: 0
  },
  logo: {
    paddingTop: 2,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  leftItems: {
    display: 'flex',
    alignItems: 'center'
  },
  rightItems: {
    display: 'flex',
    alignItems: 'center',
  }
});

export default useStyles;
