import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Sidebar from '../containers/Sidebar';
import TopNav from '../containers/TopNav';
import Ads from './ads';
import Cashier from './cashier';
import Categories from './categories';
import Charts from './charts';
import Client from './client';
import Dishes from './dishes';
import Home from './home';
import Kitchen from './kitchen';
import Options from './options';
import Orders from './orders';
import Profile from './profile';
import Promotions from './promotions';
import Score from './score';
import Tables from './tables';
import Waiters from './waiters';
import Welcome from './welcome';


const MainApp = ({ history, location, containerClassnames }) => {
  let clientId = null
  let path = location.pathname

  const isDashboardPath = () => {
    if (
      path.includes('/client/') &&
      /[\d]/.test(path) &&
      !path.includes('options') &&
      !path.includes('cashier') &&
      !path.includes('kitchen')
    ) {
      clientId = path.match(/[\d]+/)[0]
      return true
    }
    return false
  }

  return (
    <div id='app-container' className={containerClassnames}>
      <TopNav history={history} pathname={location.pathname} />
      {isDashboardPath() && <Sidebar clientId={clientId} />}
      <main>
        <div className='container-fluid'>
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/profile' component={Profile} exact />
            <Route path='/clients/user/:id' component={Client} exact />
            <Route path='/client/:id' component={Welcome} exact />
            <Route path='/client/:id/options' component={Options} exact />
            <Route path='/client/:id/cashier' component={Cashier} exact />
            <Route path='/client/:id/kitchen' component={Kitchen} exact />
            <Route path='/client/:id/dishes' component={Dishes} exact />
            <Route path='/client/:id/charts' component={Charts} exact />
            <Route path='/client/:id/categories' component={Categories} exact />
            <Route path='/client/:id/tables' component={Tables} exact />
            <Route path='/client/:id/waiters' component={Waiters} exact />
            <Route path='/client/:id/orders' component={Orders} exact />
            <Route path='/client/:id/ads' component={Ads} exact />
            <Route path='/client/:id/promotions' component={Promotions} exact />
            <Route path='/client/:id/score' component={Score} exact />
          </Switch>
        </div>
      </main>
    </div>
  )
}

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(MainApp)
)
