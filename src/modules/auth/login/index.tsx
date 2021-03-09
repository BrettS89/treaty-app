import './styles.css';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { ActionTypes } from '../../../store/actions';
import useStyles from './styles';
import app from '../../../feathers';
import { User } from '../../../types/services/security';

const Login = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onLogin = async (e: any) => {
    e.preventDefault();
    dispatch({ type: ActionTypes.SET_APP_LOADING, payload: true });

    try {
      const res: { user: User, token: string } = await app
        .service('security/session')
        .create({
          email: e.target.email.value,
          password: e.target.password.value
        });

      localStorage.setItem('token', res.token);
      dispatch({ type: ActionTypes.SET_USER, payload: res.user });
      dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });
      if (res.user.role.name.includes('broker')) {
        props.history.push('/app/broker/dashboard');
      } else if (res.user.role.name.includes('reinsurer')) {
        props.history.push('/app/reinsurer/dashboard');
      } else if (res.user.role.name === 'superadmin') {
        props.history.push('/app/broker/dashboard');
      }
    } catch(e: any) {
      console.log(e)
      dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });
      dispatch({ type: ActionTypes.SET_APP_ERROR, payload: e.message });
    }
  };

  return (
    <div className="Login">
      <div>
        <form className={classes.form} onSubmit={onLogin}>
          <Typography variant="h4">
            Welcome back
          </Typography>
          <div className="Login-form-inputs">
            <TextField
              name="email"
              margin="dense"
              id="email"
              label="Email"
              type="text"
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              name="password"
              margin="dense"
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              autoComplete="off"
            />
          </div>
          <Button type="submit" variant="contained" size="large" color="primary" disableElevation>
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
