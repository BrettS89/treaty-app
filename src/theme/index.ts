import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#069CEC',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: "\"Questrial\", sans-serif",
    button: {
      textTransform: 'none',
      //@ts-ignore
      // fontWeight: '500',
    }
  },
});

export default theme;
