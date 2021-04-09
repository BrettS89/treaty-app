import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../modules/landing/home';
import Login from '../modules/auth/login';

// Broker components
import BrokerDashboard from '../modules/app/broker/dashboard';
import MyDeals from '../modules/app/broker/my-deals';
import Markets from '../modules/app/broker/markets';
import CreateDeal from '../modules/app/broker/create-deal';
import Deal from '../modules/app/broker/deal';

// reinsurer components
import reinsurerDashboard from '../modules/app/reinsurer/dashboard';
import reinsurerDeals from '../modules/app/reinsurer/my-deals';
import SearchDeals from '../modules/app/reinsurer/search-deals';
import ReDeal from '../modules/app/reinsurer/deal';

export default () => {
  return (
    <Switch>
      <Route exact path="/app/reinsurer/my-deals/:id" component={ReDeal} />
      <Route exact path="/app/reinsurer/search-deals/:id" component={ReDeal} />
      <Route exact path="/app/reinsurer/search-deals" component={SearchDeals} />
      <Route exact path="/app/reinsurer/my-deals" component={reinsurerDeals} />
      <Route exact path="/app/reinsurer/dashboard" component={reinsurerDashboard} />
      
      <Route exact path="/app/broker/my-deals/:id" component={Deal} />
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
