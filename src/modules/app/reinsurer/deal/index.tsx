import './styles.css';
import { useState } from 'react';
import api from '../../../../feathers';
import authorization from '../../../../components/authorization';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import { Deal as DealType, Detail as DetailType } from '../../../../types/services/insurance';
import View from './view';

const ReDeal = (props: any) => {
  const deal_id = props.match.params.id;
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.user);
  const dealState = useSelector((state: StoreState) => state.deal);
  const isFollowing = !!dealState.dealsFollowing.find(d => d._id === deal_id)
  let deal = dealState.accessibleDeals.filter(deal => deal._id === deal_id)[0];

  const [rightComponent, setRightComponent] = useState<string>('TreatyInformation');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState<string>('');

  const followDeal = (): void => {
    dispatch({ type: ActionTypes.FOLLOW_DEAL, payload: deal._id });
  };

  const unFollowDeal = () => {
    dispatch({ type: ActionTypes.UNFOLLOW_DEAL, payload: deal._id });
  };

  const getMessages = () => {
    api.service('communication/message').find({
      query: {
        deal_id,
        account_id: user.details.account_id,
        $sort: { createdAt: 1 },
        $resolve: { user: true },
      }
    })
    .then(res => setMessages(res.data));
  };

  const onTypeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (!message.length) return;

    await api.service('communication/message').create({
      account_id: user.details.account_id,
      user_id: user.details._id,
      deal_id,
      message,
      read: [user.details._id],
    });
    
    setMessage('');
    getMessages();
  };

  const updateUnread = async (messages: any[]) => {
    const promiseArr = messages.map(m => {
      return api.service('communication/message').patch(m._id, {
        read: [...m.read, user.details._id],
      });
    });

    await Promise.all(promiseArr);

    getMessages();
  }

  useEffect(() => {
    if (!deal) {
      dispatch({
        type: ActionTypes.SEARCH_DEALS,
        payload: user.details.account_id
      });
    } else {
      getMessages();
    }
  }, [deal]);
  
  return deal
    ? (
      <View
        deal={deal}
        followDeal={followDeal}
        isFollowing={isFollowing}
        message={message}
        messages={messages}
        onTypeMessage={onTypeMessage}
        rightComponent={rightComponent}
        sendMessage={sendMessage}
        setRightComponent={setRightComponent}
        unFollowDeal={unFollowDeal}
        updateUnread={updateUnread}
        userId={user.details._id}
      />
    )
    : <div>Loading...</div>
};

export default authorization(ReDeal);
