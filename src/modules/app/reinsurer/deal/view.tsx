import { Typography } from '@material-ui/core';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';

interface ReDealProps {
  deal: DealType;
}

const View = (props: ReDealProps) => {
  const { deal } = props;

  return (
    <div className="ReDeal">
      <Typography variant="h4" className="title">
        {deal.title}
      </Typography>
    </div>
  );
};

export default View;
