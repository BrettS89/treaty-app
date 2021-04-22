import { FC } from 'react';
import { Typography } from '@material-ui/core';
import useStyles from '../styles';
import '../styles.css';

interface RightNavProps {
  component: string;
  setSideComponent(str: string): void;
}

const RightNav: FC<RightNavProps> = ({ component, setSideComponent }) => {
  const classes = useStyles();

  const setColor = (str: string): string => {
    return str === component
      ? '#069CEC'
      : 'grey';
  };

  return (
    <div className="Deal-right-nav">
      <div className="Deal-right-nav-link" onClick={() => setSideComponent('TreatyInformation')}>
        <Typography style={{ color: setColor('TreatyInformation') }} className={classes.rightNavLink}>Treaty Information</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('GeneralTerms')}>
        <Typography style={{ color: setColor('GeneralTerms') }} className={classes.rightNavLink}>General Terms</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('Expenses')}>
        <Typography style={{ color: setColor('Expenses') }} className={classes.rightNavLink}>Expenses</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('Territory')}>
        <Typography style={{ color: setColor('Territory') }} className={classes.rightNavLink}>Territory</Typography>
      </div>

      <div className="Deal-right-nav-link" onClick={() => setSideComponent('TreatyInformation')}>
        <Typography className={classes.rightNavLink}>Files</Typography>
      </div>
    </div>
  );
};

export default RightNav;
