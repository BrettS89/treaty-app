import { useEffect, useState } from 'react';
import _ from 'lodash';
// import { useDispatch, useSelector } from 'react-redux';
// import { StoreState } from '../../../../store';
// import { ActionTypes } from '../../../../store/actions';
import api from '../../../../feathers';
import authorization from '../../../../components/authorization';
import ManageView from './view';
import { Deal as DealType } from '../../../../types/services/insurance';
import { Account as AccountType } from '../../../../types/services/security';

const Manage = (props: any) => {
  const deal_id = props.match.params.id;

  const [deal, setDeal] = useState<DealType>(null);
  const [currentChat, setCurrentChat] = useState<AccountType>({ _id: '', name: '' });
  const [messages, setMessages] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true);

  const formatMessages = (messages: any[]) => {
    return messages.reduce((acc, curr) => {
      const obj = _.cloneDeep(acc);
      obj[curr.account_id] = obj[curr.account_id]
        ? [...obj[curr.account_id], curr]
        : [curr];

      return obj;
    }, {});
  };

  const fetchDeal = async () => {
    const dealData = await api.service('insurance/deal').get(deal_id, {
      query: {
        $resolve: { access: true, messages: true },
      },
    });

    const formattedMessages = formatMessages(dealData.messages);

    setDeal(dealData);
    setMessages(formattedMessages);
    setCurrentChat(dealData?.access[0]?.account);
    setLoading(false);
  };

  const setCurrentChatCompany = (account: AccountType): void => {
    setCurrentChat(account);
  };

  useEffect(() => {
    fetchDeal();
  }, []);

  return !loading
    ?  (
      <ManageView
        deal={deal}
        currentChat={currentChat}
        messages={messages}
        setCurrentChatCompany={setCurrentChatCompany}
      />
    )
    : (
      <div style={{ padding: 20 }}>Loading...</div> 
    );
};

export default authorization(Manage);
