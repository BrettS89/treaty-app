import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Dialog } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux';
import { StoreState, ActionTypes } from '../../store';
import { components } from './config.json';

import Admitted from './components/admitted';
import ContractTerm from './components/contract-term';
import CoverageRisks from './components/reinsurance-coverage';
import EffectiveDate from './components/effective-date';
import ExcessTreaty from './components/excess-treaty';
import InsuranceType from './components/insurance-type';
import Title from './components/title';
import TreatyType from './components/type';

const CreateDealModal = (props: any) => {
  const dispatch = useDispatch();
  const appState = useSelector((state: StoreState) => state.app);
  const user = useSelector((state: StoreState) => state.user);
  
  const [treaty, setTreaty] = useState<Record<string, any>>({})
  const [component, setComponent] = useState<string>(components.TREATY_TYPE);

  const onClose = (): void => {
    setTreaty({});
    dispatch({ type: ActionTypes.TOGGLE_DEAL_MODAL, payload: false });
    setComponent(components.TREATY_TYPE);
  };

  const createDeal = (): void => {
    console.log('inn');
    dispatch({
      type: ActionTypes.CREATE_DEAL,
      payload: {
        data: {
          user_id: user.details._id,
          account_id: user.details.account_id,
          ...treaty,
        },
        navigate: props.history.push,
      },
    });
  };

  const renderComponent = (): JSX.Element => {
    switch(component) {
      case components.TREATY_TYPE:
        return (
          <TreatyType
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      case components.INSURANCE_TYPE:
        return (
          <InsuranceType
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      case components.EFFECTIVE_DATE:
        return (
          <EffectiveDate
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      case components.CONTRACT_TERM:
        return (
          <ContractTerm
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      case components.COVERAGE_RISKS:
        return (
          <CoverageRisks
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      case components.EXCESS_TREATY:
        return (
          <ExcessTreaty
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      case components.ADMITTED:
        return (
          <Admitted
            createDeal={createDeal}
            onClose={onClose}
            setComponent={setComponent}
            setTreaty={setTreaty}
            treaty={treaty}
          />
        );

      default:
        return <Title onClose={onClose} />;
    }
  };

  return (
    <Dialog open={appState.dealModalOpen}>
      <div style={{ height: 350, width: 600 }}>
        {renderComponent()}
      </div>
    </Dialog>
  )
};

export default withRouter(CreateDealModal);
