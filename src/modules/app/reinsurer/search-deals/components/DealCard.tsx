import { Avatar, Button, Typography } from '@material-ui/core';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import useStyles from '../styles';
import { Deal as DealType } from '../../../../../types/services/insurance';

interface ReDealCardProps {
  deal: DealType;
  navigateToDeal(_id: string): void;
}

const DealCard = (props: ReDealCardProps) => {
  const { deal, navigateToDeal } = props;
  const classes = useStyles();

  const premium = deal.details.filter(detail => {
    return detail.key === 'projected_gross_premium'
      ?? detail.key === 'projected_net_premium';
  })[0];
  const premiumValue = premium.value;
  const premiumType = premium.key === 'projected_gross_premium'
    ? 'Projected gross premium'
    : 'Projected net premium'

  return (
    <div className="ReDealCard">
      <div className="ReDealCard-left">
        <Avatar>
          <LibraryBooksRoundedIcon style={{ fontSize: 20 }} />
        </Avatar>

        <div className="ReDealCard-insurance">
          <Typography className={classes.company}>{deal.title}</Typography>
          <Typography>Life Insurance</Typography>
          <Typography>{premiumValue}{premiumType}</Typography>
        </div>
      </div>

      <div>
        <Typography className={classes.broker}>Broker:</Typography>
        <Typography>{`${deal.user.firstname} ${deal.user.lastname}`}</Typography>
        <Typography className={classes.company}>{deal.user.account.name}</Typography>
      </div>

      <div>
        <Button
          color="primary"
          variant='contained'
          disableElevation
          onClick={() => navigateToDeal(deal._id)}
        >
          View
        </Button>
      </div>
    </div>
  );
};

export default DealCard;
