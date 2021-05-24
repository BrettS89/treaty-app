import { FC } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../styles';
import '../styles.css';

interface RightNavProps {
  chat?: boolean;
  component: string;
  markets?: boolean;
  messages?: any[];
  setSideComponent(str: string): void;
  userId?: string;
}

const RightNav: FC<RightNavProps> = ({ component, setSideComponent, chat = false, userId = '', messages = [], markets = false }) => {
  const classes = useStyles();

  const unread = messages.reduce((acc, curr) => {
    return !curr.read.includes(userId)
      ? acc + 1
      : acc;
  }, 0);

  const setColor = (str: string): string => {
    return str === component
      ? '#069CEC'
      : 'grey';
  };

  const renderBadge = () => {
    if (unread > 0) {
      return (
        <span className="Deal-right-nav-link-span">{unread}</span>
      );
    }
  };

  const renderChat = () => {
    if (chat) {
      return (
        <div className="Deal-right-nav-link" style={{ display: 'flex' }} onClick={() => setSideComponent('Chat')}>
          <Typography style={{ color: setColor('Chat'), fontSize: 15 }} className={classes.rightNavLink}>Chat</Typography>
          {renderBadge()}
        </div>
      );
    }
  };

  const renderMarkets = () => {
    if (markets) {
      return (
        <div className="Deal-right-nav-link" style={{ display: 'flex' }} onClick={() => setSideComponent('Markets')}>
          <Typography style={{ color: setColor('Markets'), fontSize: 15 }} className={classes.rightNavLink}>Markets</Typography>
        </div>
      );
    }
  };

  return (
    <div className="Deal-right-nav">
      <div className="Deal-right-nav-link" onClick={() => setSideComponent('TreatyInformation')}>
        <Typography style={{ color: setColor('TreatyInformation'), fontSize: 15 }} className={classes.rightNavLink}>Treaty Info</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('GeneralTerms')}>
        <Typography style={{ color: setColor('GeneralTerms'), fontSize: 15 }} className={classes.rightNavLink}>General Terms</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('Expenses')}>
        <Typography style={{ color: setColor('Expenses'), fontSize: 15 }} className={classes.rightNavLink}>Expenses</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('Territory')}>
        <Typography style={{ color: setColor('Territory'), fontSize: 15 }} className={classes.rightNavLink}>Territory</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('Files')}>
        <Typography style={{ color: setColor('Files'), fontSize: 15 }} className={classes.rightNavLink}>Files</Typography>
      </div>
      {renderMarkets()}
      {renderChat()}
    </div>
  );
};

export default RightNav;
