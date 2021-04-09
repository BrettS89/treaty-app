import { Button, Typography } from '@material-ui/core';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import useStyles from './styles';

interface ReDealProps {
  deal: DealType;
  followDeal(): void;
  isFollowing: boolean;
  unFollowDeal(): void;
}

const View = (props: ReDealProps) => {
  const { deal, followDeal, isFollowing, unFollowDeal } = props;
  const classes = useStyles();

  const renderFollowing = () => {
    if (isFollowing) {
      return (
        <Button
          color="primary"
          style={{ fontWeight: 600, fontSize: 16 }}
          onClick={unFollowDeal}
        >
          Unfollow
        </Button>
      );
    }

    return (
      <Button
        color="primary"
        style={{ fontWeight: 600, fontSize: 16 }}
        onClick={followDeal}
      >
        Follow
      </Button>
    );
  }

  return (
    <div className="ReDeal">
      <div className="ReDeal-top">
        <Typography variant="h4" className="title ReDeal-title">
          {deal.title}
        </Typography>
        {renderFollowing()}
      </div>

      <div className="ReDeal-main">
        <div className="ReDeal-content" style={{ marginRight: 10 }}>
          <div className="ReDeal-insurance-overview">
            <span className="ReDeal-insurance-overview-left">Insurance Company:</span>
            <span>{deal.insurance_company}</span>
          </div>

          <div className="ReDeal-insurance-overview">
            <span className="ReDeal-insurance-overview-left">Insurance Type:</span>
            <span>{deal.insurance_type}</span>
          </div>

          <div className="ReDeal-insurance-overview">
            <span className="ReDeal-insurance-overview-left">Business Covered:</span>
            <span>{deal.business_covered}</span>
          </div>
        </div>

        <div className="ReDeal-content" style={{ marginLeft: 10 }}>
          <div className="ReDeal-content-summary">
            <Typography className={classes.summaryTitles}>
              Executive Summary
            </Typography>
            <div>
              {deal.executive_summary}
            </div>
          </div>

          <div className="ReDeal-content-summar">
            <Typography className={classes.summaryTitles}>
              Additional Details
            </Typography>
            <div>
              {deal.additional_details}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default View;
