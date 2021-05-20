import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Deal } from '../../../../../types/services/insurance';
import useStyles from '../styles';
import { formatDate } from '../../../../../utilities/helpers';

interface TreatyDetailsProps {
  deal: Deal;
}

const TreatyDetails: React.FC<TreatyDetailsProps> = ({ deal }) => {
  const classes = useStyles();

  return (
    <div className="Deal-treaty-type">
      <Typography variant="h6" className="title">
        Treaty Details
      </Typography>

      <div>
        <List dense={false}>
          <ListItem className={classes.bullet}>
            <ListItemIcon>
              <Typography className={classes.bulletKey}>Treaty Type:</Typography>
            </ListItemIcon>
            <ListItemText
              primary={`${deal.reinsurance_coverage}, ${deal.treaty_type.join(', ')}`}
            />
          </ListItem>

          <ListItem className={classes.bullet}>
            <ListItemIcon>
              <Typography className={classes.bulletKey}>Effective Date:</Typography>
            </ListItemIcon>
            <ListItemText
              primary={`${formatDate(deal.effective_date)}, ${deal.contract_term}`}
            />
          </ListItem>

          <ListItem className={classes.bullet}>
            <ListItemIcon>
              <Typography className={classes.bulletKey}>Excess Policies Covered:</Typography>
            </ListItemIcon>
            <ListItemText
              primary={`${deal.excess_treaty ? 'Yes' : 'No'}`}
            />
          </ListItem>

          <ListItem className={classes.bullet}>
            <ListItemIcon>
              <Typography className={classes.bulletKey}>Admitted or Non Admitted:</Typography>
            </ListItemIcon>
            <ListItemText
              primary={deal.admitted.length === 1 ? deal.admitted[0] : 'Both'}
            />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default TreatyDetails;
