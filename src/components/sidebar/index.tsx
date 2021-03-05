import './styles.css';
import { withRouter } from 'react-router-dom';
import { Avatar, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import useStyles from './styles';
import { brokerSidebar, purchaserSidebar } from './sidebar-content';

const Sidebar = (props: any) => {
  const classes = useStyles();
  const currentPath = props.location.pathname;
  const styles = currentPath.includes('app')
    ? {}
    : { display: 'none' };

  const getSidebar = () => {
    if (currentPath.includes('broker')) return brokerSidebar;
    if (currentPath.includes('purchaser')) return purchaserSidebar;
    return [];
  }

  const renderSidebarList = () => {
    return getSidebar().map(({ text, Icon, path }) => (
      <ListItem
        button
        key={text}
        onClick={() => props.history.push(path)}
        selected={currentPath === path}
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
        <Avatar>B</Avatar>
        <Typography className={classes.typography}>
          Beach & Associates
        </Typography>
      </div>
    </div>
  )
};

export default withRouter(Sidebar);
