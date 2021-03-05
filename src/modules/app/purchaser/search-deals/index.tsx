import './styles.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../../store';
import app from '../../../../feathers';
import authorization from '../../../../components/authorization';
import View from './view';

const SearchDeals = () => {
  const user = useSelector((state: StoreState) => state.user);

  const fetchDeals = async () => {
    const data = await app.service('insurance/access')
      .find({
        query: {
          // account_id: user?.details?.account_id,
          $resolve: {
            deal: true,
          },
        },
      });
    
    console.log(data);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <View />
  );
};

export default authorization(SearchDeals);
