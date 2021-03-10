import './styles.css';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { StoreState, ActionTypes } from '../../store';
import useStyles from './styles';
import { brokerSidebar, reinsurerSidebar } from './sidebar-content';

const Sidebar = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user);
  const classes = useStyles();
  const currentPath = props.location.pathname;
  const styles = currentPath.includes('app')
    ? {}
    : { display: 'none' };

  const getSidebar = (): any[] => {
    if (currentPath.includes('broker')) return brokerSidebar;
    if (currentPath.includes('reinsurer')) return reinsurerSidebar;
    return [];
  }

  const clickHandler = (path: string): void => {
    if (path === '/app/broker/create-deal') {
      dispatch({ type: ActionTypes.TOGGLE_DEAL_MODAL, payload: true });
    } else {
      props.history.push(path)
    }
  };

  const renderSidebarList = (): JSX.Element[] => {
    return getSidebar().map(({ text, Icon, path }) => (
      <ListItem
        button
        key={text}
        onClick={() => clickHandler(path)}
        selected={currentPath.includes(path)}
      >
        <ListItemIcon>
          <Icon
            style={text === 'Create deal' ? { fontSize: 28 } : {}}
          />
        </ListItemIcon>
        <ListItemText
          primary={text}
        />
      </ListItem>
    ))
  }

  return (
    <div className="Sidebar" style={styles}>
      <List style={{ width: '100%' }}>
        {renderSidebarList()}
      </List>
      <div className="Sidebar-company">
        <Avatar>{user?.details?.account?.name[0]}</Avatar>
        <Typography className={classes.typography}>
          {user?.details?.account?.name}
        </Typography>
      </div>
    </div>
  )
};

export default withRouter(Sidebar);
