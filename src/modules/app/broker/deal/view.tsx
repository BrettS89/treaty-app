import { Typography } from '@material-ui/core';
import { Deal } from '../../../../types/services/insurance';

interface DealViewProps {
  deal: Deal;
}

const View = (props: DealViewProps) => {
  const { deal } = props;

  return (
    <div className="Deal">
      <Typography variant="h4">
        {deal.title}
      </Typography>
    </div>
  );
};

export default View;
