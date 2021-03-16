import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../store/actions';
import { StoreState } from '../../store';
import app from '../../feathers';

const authorization = (ChildComponent: any) => {
  const ComposedComponent = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: StoreState) => state.user);
    const path = props.location.pathname;

    const [finishedAuth, setFinishedAuth] = useState<boolean>(false);

    const checkRole = async (): Promise<void> => {
      let userData = user?.details;
      let role = user?.details?.role;

      try {
        dispatch({ type: ActionTypes.SET_APP_LOADING, payload: true });    
        if (localStorage.getItem('token') && !user.details) {
          try {
            const { data } = await app.service('security/session').find();
            userData = data;
            role = data.role;
            dispatch({ type: ActionTypes.SET_USER, payload: data });

            if (role.name === 'broker') {
              dispatch({ type: ActionTypes.GET_MY_DEALS });
            } else if (role.name === 'reinsurer') {
              dispatch({ type: ActionTypes.SEARCH_DEALS, payload: userData.account_id });
            }

            setFinishedAuth(true)
          } catch(e) {
            dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });  
            props.history.push('/');
          }
        }



        if (path.includes('app') && !role) {
          props.history.push('/');

        } else if (path.includes('broker') && role?.name.includes('reinsurer')) {

          props.history.push('/app/reinsurer/dashboard');

        } else if (path.includes('reinsurer') && role?.name.includes('broker')) {

          props.history.push('/app/broker/dashboard');
        }

        setFinishedAuth(true);
        dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });  
      } catch(e) {
        dispatch({ type: ActionTypes.SET_APP_LOADING, payload: false });  
        dispatch({ type: ActionTypes.SET_APP_ERROR });
      }
    }

    useEffect(() => {
      checkRole();
    }, [user, path]);

    return finishedAuth
      ? (
        <ChildComponent {...props} />
      )
      : <div />
  }

  return ComposedComponent
};

export default authorization;
