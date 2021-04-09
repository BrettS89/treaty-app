import { Avatar, Button, Typography } from '@material-ui/core';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import useStyles from '../styles';
import { Deal as DealType } from '../../../../../types/services/insurance';
import KeyValue from '../../../../../components/key-value';
import { formatDate } from '../../../../../utilities/helpers';

interface ReDealCardProps {
  deal: DealType;
  navigateToDeal(_id: string): void;
}

const DealCard = (props: ReDealCardProps) => {
  const { deal, navigateToDeal } = props;
  const classes = useStyles();

  const projectedPremium = deal.details.filter(detail => {
    return detail.key === 'projected_premium'
  })[0]?.value ?? 'tbd';

  const lossRation = deal.details.filter(detail => {
    return detail.key === 'projected_loss_ratio'
  })[0]?.value ?? 'tbd';
  
  return (
    <div className="ReDealCard">
      <div className="ReDealCard-left">
        <Avatar style={{ backgroundColor: "#50c878" }}>
          <LibraryBooksRoundedIcon style={{ fontSize: 20 }} />
        </Avatar>

        <div className="ReDealCard-insurance">
          <Typography className={classes.company} color="primary">{deal.title}</Typography>
          <KeyValue keyString="Company:" valueString={deal.insurance_company} />
          <KeyValue keyString="Insurance:" valueString={deal.insurance_type.join(', ')} />
          <KeyValue keyString="Business Covered:" valueString={deal.business_covered} />
        </div>
      </div>

      <div>
        <Typography className={classes.company} color="primary">Insurance details</Typography>
        <KeyValue keyString="Projected Premium:" valueString={projectedPremium} />
        <KeyValue keyString="Projected Loss Ratio:" valueString={lossRation} />
        <KeyValue keyString="Effective Date" valueString={formatDate(deal.effective_date)} />
      </div>

      <div>
        <Typography className={classes.company} color="primary">Broker</Typography>
        <Typography>{`${deal.user.firstname} ${deal.user.lastname}`}</Typography>
        <Typography className={classes.title}>{deal.user.account.name}</Typography>
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
