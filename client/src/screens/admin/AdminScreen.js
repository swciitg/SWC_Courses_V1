import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';

import DashboardScreen from './DashboardScreen';
import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import CalendarScreen from './CalendarScreen';
import NotFound from '../../components/NotFound';

const AdminScreen = () => {
  let { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <Redirect to={`${path}/welcome`} />
      </Route>
      <Route path={`${path}/welcome`} exact>
        <WelcomeScreen />
      </Route>
      <Route path={`${path}/home`} exact>
        <HomeScreen />
      </Route>
      <Route path={`${path}/dashboard`} exact>
        <DashboardScreen />
      </Route>
      <Route path={`${path}/calendar`} exact>
        <CalendarScreen />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AdminScreen;