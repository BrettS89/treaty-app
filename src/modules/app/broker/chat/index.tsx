import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import api from '../../../../feathers';
import authorization from '../../../../components/authorization';
import ManageView from './view';
import { Deal as DealType } from '../../../../types/services/insurance';
import { Account as AccountType } from '../../../../types/services/security';

const Manage = (props: any) => {
  const deal_id = props.match.params.id;

  const user = useSelector((state: StoreState) => state.user);

  const [deal, setDeal] = useState<DealType>(null);
  const [currentChat, setCurrentChat] = useState<AccountType>({ _id: '', name: '' });
  const [messages, setMessages] = useState<Record<string, any[]>>({})
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const formatMessages = (messages: any[], access: any[] = []) => {
    if (!access || !access.length) return {}; 
    const accountObj = access.reduce((acc, curr) => {
      const obj = _.cloneDeep(acc);
      obj[curr.account_id] = [];
      return obj;
    }, {})

    return messages.reduce((acc, curr) => {
      const obj = _.cloneDeep(acc);
      obj[curr.account_id] = [...obj[curr.account_id], curr];

      return obj;
    }, accountObj);
  };

  const fetchDeal = async () => {
    const dealData = await api.service('insurance/deal').get(deal_id, {
      query: {
        $resolve: { access: true, messages: true },
      },
    });

    const formattedMessages = formatMessages(dealData.messages, dealData?.access);

    setDeal(dealData);
    setMessages(formattedMessages);
    setCurrentChat(dealData?.access[0]?.account);
    setLoading(false);
  };

  const setCurrentChatCompany = (account: AccountType): void => {
    setCurrentChat(account);
  };

  const onTypeMessage = (e): void => {
    setMessage(e.target.value);
  }

  const sendMessage = (): void => {
    const service = api.service('communication/message');
    if (!message.length) return;
    return service
      .create({
        deal_id: deal_id,
        account_id: currentChat._id,
        user_id: user.details._id,
        message,
        read: [user.details._id],
      })
      .then(message => service.get(message._id, { query: { $resolve: { user: true } } }))
      .then(message => {
        const obj = _.cloneDeep(messages);
        obj[currentChat._id].push(message);
        setMessages(obj);
        setMessage('');
      });
  };

  const updateUnread = async (messages: any[]) => {
    const promiseArr = messages.map(m => {
      return api.service('communication/message').patch(m._id, {
        read: [...m.read, user.details._id],
      });
    });

    await Promise.all(promiseArr);

    fetchDeal();
  };

  useEffect(() => {
    fetchDeal();
  }, []);

  return !loading
    ?  (
      <ManageView
        deal={deal}
        currentChat={currentChat}
        message={message}
        messages={messages}
        onTypeMessage={onTypeMessage}
        sendMessage={sendMessage}
        setCurrentChatCompany={setCurrentChatCompany}
        updateUnread={updateUnread}
        userId={user.details._id}
      />
    )
    : (
      <div style={{ padding: 20 }}>Loading...</div> 
    );
};

export default authorization(Manage);
