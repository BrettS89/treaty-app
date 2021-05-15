import './styles.css';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import { ActionTypes } from '../../../../store/actions';
import View from './view';
import authorization from '../../../../components/authorization';
import api from '../../../../feathers';

const Markets = () => {
  const dispatch = useDispatch();

  const market = useSelector((state: StoreState) => state.market);
  const user = useSelector((state: StoreState) => state.user);

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketEditing, setMarketEditing] = useState({ field: '', id: '', account_id: '' });
  const [markets, setMarkets] = useState([]);
  const [marketFieldModal, setMarketFieldModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [visibleMarkets, setVisibleMarkets] = useState([]);

  const fetchMarkets = (): Promise<void> => {
    return api.service('security/account').find({
      query: {
        type: 'reinsurer',
        $sort: { name: 1 },
      },
    })
    .then(res => {
      setMarkets(res.data);
      setVisibleMarkets(res.data);
    });
  };

  const selectList = (list): void => {
    setSelectedList(list);
  };

  const createList = (): void => {
    dispatch({
      type: ActionTypes.CREATE_MARKET_LIST,
      payload: {
        data: {
          account_id: user.details.account_id,
          user_id: user.details._id,
        },
        callback: setSelectedList,
      }
    });
  };

  const editList = (data: Record<string, any>) => {
    dispatch({
      type: ActionTypes.EDIT_MARKET_LIST,
      payload: { id: selectedList._id, data },
    });
  };

  const updateListName = (name: string) => {
    editList({ name });
  };

  const deleteList = async () => {
    dispatch({ type: ActionTypes.DELETE_MARKET_LIST, payload: selectedList._id });
  };

  const openCloseModal = (isOpen, editing?) => {
    setMarketFieldModal(isOpen);
    if (editing) {
      setMarketEditing(editing);
    } else {
      setMarketEditing({ field: '', id: '', account_id: '' });
    }
  };

  const addMarketToList = (e: any): Promise<void> => {
    if (!e?._id) return;

    editList({ markets: [...selectedList.markets, { account_id: e._id }] });
  };

  const addExisitngContact = async (id: string) => {
    const updatedMarkets = selectedList.markets.map(m => {
      if (m._id === marketEditing.id) {
        return {
          ...m,
          contact_id: id,
        };
      }
      return m;
    });

    editList({ markets: updatedMarkets });

    setMarketEditing({ id: '', field: '', account_id: '' });
    setMarketFieldModal(false);
  };

  const addNewContact = async (data: Record<string, string>) => {
    const contact = await api.service('market/contact').create({
      account_id: user.details.account_id,
      reinsurer_account_id: marketEditing.account_id,
      name: data.name,
      title: data.title,
      email: data.email,
      phone: data.phone,
    });

    addExisitngContact(contact._id);
  };

  const editMarketField = async (value: any, remove?: boolean) => {
    if (remove) {
      var updatedMarkets = selectedList.markets
        .filter(m => m._id !== value)
        .map(m => {
          const market = _.cloneDeep(m);
          return market;
        });
    } else {
      var updatedMarkets = selectedList.markets.map(m => {
        const market = _.cloneDeep(m);

        if (market._id === marketEditing.id) {
          return {
            ...market,
            [marketEditing.field]: value,
          };
        }

        return market;
      });
    }

    editList({ markets: updatedMarkets });

    setMarketEditing({ id: '', field: '', account_id: '' });
    setMarketFieldModal(false);
  };

  const deleteMarket = (id: string): void => {
    editMarketField(id, true)
  }

  const fetchData = async () => {
    await Promise.all([fetchMarkets()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    if (!selectedList) {
      setSelectedList(market.lists[0] ?? null);
    } else {
      const list = market.lists.find(l => l._id === selectedList._id);
      setSelectedList(list ?? null);
    }
  }, [market.lists]);

  return (
    <View
      addExisitngContact={addExisitngContact}
      addMarketToList={addMarketToList}
      addNewContact={addNewContact}
      createList={createList}
      deleteList={deleteList}
      deleteMarket={deleteMarket}
      editMarketField={editMarketField}
      lists={market.lists}
      marketEditing={marketEditing}
      marketFieldModal={marketFieldModal}
      selectList={selectList}
      selectedList={selectedList}
      setMarketFieldModal={openCloseModal}
      updateListName={updateListName}
      visibleMarkets={visibleMarkets}
    />
  );
};

export default authorization(Markets);
