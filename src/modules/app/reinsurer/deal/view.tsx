import { Button, Typography } from '@material-ui/core';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import useStyles from './styles';
import TreatyDetails from '../../broker/deal/components/treaty-details';
import RightNav from '../../broker/deal/components/right-nav';
import Details from './components/detail';
import Chat from './components/chat';
import Territories from './components/territories';
import Files from './components/files';

interface ReDealProps {
  deal: DealType;
  followDeal(): void;
  isFollowing: boolean;
  message: string;
  messages: any[];
  onTypeMessage(str: string): void;
  rightComponent: string;
  sendMessage(): void;
  setRightComponent(str: string): void;
  unFollowDeal(): void;
  updateUnread(arr: any[]): void;
  userId: string;
}

const View = (props: ReDealProps) => {
  const { deal, followDeal, isFollowing, message, messages, onTypeMessage, rightComponent, sendMessage, setRightComponent, unFollowDeal, updateUnread, userId } = props;
  const classes = useStyles();

  const renderFollowing = (): JSX.Element => {
    if (isFollowing) {
      return (
        <Button
          color="primary"
          style={{ fontSize: 16 }}
          onClick={unFollowDeal}
        >
          Unfollow
        </Button>
      );
    }

    return (
      <Button
        color="primary"
        style={{ fontSize: 16 }}
        onClick={followDeal}
      >
        Follow
      </Button>
    );
  };

  const renderRightComponent = (): JSX.Element => {
    switch(rightComponent) {
      case 'TreatyInformation':
        return (
          <Details
            deal={deal}
            title="Treaty Information"
            section="treatyInformation"
          />
        );

      case 'GeneralTerms':
        return (
          <Details
            deal={deal}
            title="General Terms"
            section="generalTerms"
          />
        );

      case 'Expenses':
        return (
          <Details
            deal={deal}
            title="Expenses"
            section="expenses"
          />
        );

      case 'Chat':
        return (
          <Chat
            message={message}
            messages={messages}
            onTypeMessage={onTypeMessage}
            sendMessage={sendMessage}
            updateUnread={updateUnread}
            userId={userId}
          />
        );

      case 'Territory':
        return (
          <Territories deal={deal} />
        );

      case 'Files':
        return (
          <Files
            deal={deal}
          />
        );

      default:
        return (
          <Details
            deal={deal}
            title="Treaty Information"
            section="treatyInformation"
          />
        );
    }
  };

  return (
    <div className="ReDeal">
      <div className="ReDeal-top">
        <Typography variant="h5" className="title ReDeal-title">
          {deal.title}
        </Typography>
        {renderFollowing()}
      </div>

      <div className="ReDeal-main">
        <div className="ReDeal-content" style={{ marginRight: 10 }}>

          <div className="ReDeal-insurance-overview">
            <span className="ReDeal-insurance-overview-left">Broker:</span>
            <span>{deal.user.firstname} {deal.user.lastname} | {deal.user.account.name}</span>
          </div>

          <div className="ReDeal-insurance-overview">
            <span className="ReDeal-insurance-overview-left">Contact:</span>
            <span>{deal.user.email} {deal.user.phone ? `| ${deal.user.phone}` : ''}</span>
          </div>

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

          <div className="ReDeal-treaty-info">
            <TreatyDetails deal={deal} />
          </div>
          

          <div className="ReDeal-content-summary">
            <Typography className={classes.summaryTitles}>
              Executive Summary
            </Typography>
            <div>
              {deal.executive_summary}
            </div>
          </div>

          <div className="ReDeal-content-summary">
            <Typography className={classes.summaryTitles}>
              Additional Details
            </Typography>
            <div>
              {deal.additional_details}
            </div>
          </div>

        </div>

        <div className="ReDeal-content" style={{ marginLeft: 10 }}>
          <RightNav
            component={rightComponent}
            messages={messages}
            setSideComponent={setRightComponent}
            userId={userId}
            chat
          />
          {renderRightComponent()}
        </div>

      </div>
    </div>
  );
};

export default View;
