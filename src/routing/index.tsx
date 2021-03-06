import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../modules/landing/home';
import Login from '../modules/auth/login';

// Broker components
import BrokerDashboard from '../modules/app/broker/dashboard';
import MyDeals from '../modules/app/broker/my-deals';
import Markets from '../modules/app/broker/markets';
import CreateDeal from '../modules/app/broker/create-deal';

// Purchaser components
import PurchaserDashboard from '../modules/app/purchaser/dashboard';
import PurchaserDeals from '../modules/app/purchaser/my-deals';
import SearchDeals from '../modules/app/purchaser/search-deals';

export default () => {
  return (
    <Switch>
      <Route exact path="/app/purchaser/search-deals" component={SearchDeals} />
      <Route exact path="/app/purchaser/my-deals" component={PurchaserDeals} />
      <Route exact path="/app/purchaser/dashboard" component={PurchaserDashboard} />
      
      <Route exact path="/app/broker/create-deal" component={CreateDeal} />
      <Route exact path="/app/broker/markets" component={Markets} />
      <Route exact path="/app/broker/my-deals" component={MyDeals} />
      <Route exact path="/app/broker/dashboard" component={BrokerDashboard} />
      
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/" component={Home} />
    </Switch>
  );
};
