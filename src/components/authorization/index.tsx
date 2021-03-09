import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionTypes } from '../../store/actions';
import { StoreState } from '../../store';
import app from '../../feathers';

const authorization = (ChildComponent: any) => {
  const ComposedComponent = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: StoreState) => state.user);
    const path = props.location.pathname;

    const checkRole = async (): Promise<void> => {
      let role = user?.details?.role;
      
      if (localStorage.getItem('token') && !user.details) {
        try {
          const { data } = await app.service('security/session').find();
          role = data.role;
          dispatch({ type: ActionTypes.SET_USER, payload: data });
        } catch(e) {
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
    }

    useEffect(() => {
      checkRole();
    }, [user, path]);

    return (
      <ChildComponent {...props} />
    );
  }

  return ComposedComponent
};

export default authorization;
