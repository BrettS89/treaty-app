import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  subComponent: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  checkbox: {

  },
  input: {
    display: 'none',
  },
  textInput: {
    marginBottom: 10,
  },
  inputButton: {
    marginBottom: 15,
  },
  content: {
    width: 500,
  }
});

export default useStyles;
