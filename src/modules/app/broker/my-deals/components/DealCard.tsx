import { Avatar, Button, Typography } from '@material-ui/core';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import MoreHorizRoundedIcon from '@material-ui/icons/MoreHorizRounded';
import { Deal } from '../../../../../types/services/insurance';
import useStyles from '../styles';

interface DealCardProps {
  deal: Deal;
  navigateToDeal(_id: string, screen: string): void
}

const DealCard = (props: DealCardProps) => {
  const { deal, navigateToDeal } = props;
  const classes = useStyles();

  return (
    <div className="DealCard">
      <div className="DealCard-content">
        <Avatar style={{ backgroundColor: "#50c878" }}>
          <LibraryBooksRoundedIcon style={{ fontSize: 20 }} />
        </Avatar>
        <Typography
          className={classes.dealTitle}
        >
          {deal.title}
        </Typography>
      </div>
      <div style={{ display: 'flex' }}>
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => navigateToDeal(deal._id, 'edit')}
        >
          Edit
        </Button>
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => navigateToDeal(deal._id, 'manage')}
        >
          Manage
        </Button>
        <Button
          color="primary"
          className={classes.btn}
          onClick={() => navigateToDeal(deal._id, 'chat')}
        >
          Chat
        </Button>
      </div>
      <div style={{ display: 'flex' }}>
        <Typography className={classes.marketText}>
          Accessible to 19 markets
        </Typography>
      </div>

      <div>
        <MoreHorizRoundedIcon style={{ fontSize: 30 }}/>
      </div>
    </div>
  );
};

export default DealCard;
