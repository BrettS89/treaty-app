import './styles.css';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import View from './view';
import authorization from '../../../../components/authorization';
import api from '../../../../feathers';

const Markets = () => {
  const user = useSelector((state: StoreState) => state.user);

  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [marketEditing, setMarketEditing] = useState({ field: '', id: '' });
  const [markets, setMarkets] = useState([]);
  const [marketFieldModal, setMarketFieldModal] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [visibleMarkets, setVisibleMarkets] = useState([]);

  const fetchLists = (): Promise<void> => {
    return api.service('insurance/market-list').find({
      query: {
        user_id: user.details._id,
        $sort: { createdAt: -1 },
        $resolve: { markets: true },
      }
    })
    .then(res => {
      setLists(res.data);
      setSelectedList(res.data[0] ?? null);
    });
  };

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
    api.service('insurance/market-list').create({
      account_id: user.details.account_id,
      user_id: user.details._id,
    }, {
      query: { $resolve: { markets: true } },
    })
    .then(res => {
      setLists([res, ...lists]);
      setSelectedList(res);
    });
  };

  const updateListName = (name: string) => {
    api.service('insurance/market-list').patch(selectedList._id, {
      name,
    }, {
      query: { $resolve: { markets: true } }
    })
      .then(res => {
        setSelectedList(res);
        const newLists = lists.map(l => {
          return l._id === res._id
            ? res
            : l
        });
        setLists(newLists);
      });
  };

  const deleteList = async () => {
    try {
      const id = _.cloneDeep(selectedList)._id;
      await api.service('insurance/market-list').remove(id, {});
      const newList = lists.filter(l => l._id !== selectedList._id);
      console.log(newList);
      setLists(newList);
      setSelectedList(null);
    } catch(e) {
      console.log(e)
    }
  };

  const openCloseModal = (isOpen, editing?) => {
    setMarketFieldModal(isOpen);
    if (editing) {
      setMarketEditing(editing);
    } else {
      setMarketEditing({ field: '', id: '' });
    }
  };

  const addMarketToList = (e: any): Promise<void> => {
    if (!e?.target?.innerHTML) return;
    const account_id = markets.find(m => m.name === e.target.innerHTML)._id;

    return api
      .service('insurance/market-list')
      .patch(selectedList._id, {
        markets: [...selectedList.markets, { account_id }],
      }, {
        query: { $resolve: { markets: true } },
      })
      .then(res => {
        const updatedLists = lists.map(l => {
          return l._id === res._id
            ? res
            : l;
        });
        setLists(updatedLists);
        setSelectedList(res);
      });
  };

  const editMarketField = async (value: any, remove?: boolean) => {
    if (remove) {
      var updatedMarkets = selectedList.markets
        .filter(m => m._id !== value)
        .map(m => {
          const market = _.cloneDeep(m);
          delete market.account;
          return market;
        });
    } else {
      var updatedMarkets = selectedList.markets.map(m => {
        const market = _.cloneDeep(m);

        delete market.account;

        if (market._id === marketEditing.id) {
          return {
            ...market,
            [marketEditing.field]: value,
          };
        }

        return market;
      });
    }

    const updatedList = await api.service('insurance/market-list').patch(selectedList._id, {
      markets: updatedMarkets,
    }, { query: { $resolve: { markets: true } } });

    const updatedLists = lists.map(l => {
      return l._id === updatedList._id
        ? updatedList
        : l;
    });

    setSelectedList(updatedList);
    setLists(updatedLists);
    setMarketEditing({ id: '', field: '' });
    setMarketFieldModal(false);
  };

  const deleteMarket = (id: string): void => {
    editMarketField(id, true)
  }

  const fetchData = async () => {
    await Promise.all([fetchLists(), fetchMarkets()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View
      addMarketToList={addMarketToList}
      createList={createList}
      deleteList={deleteList}
      deleteMarket={deleteMarket}
      editMarketField={editMarketField}
      lists={lists}
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
