import { Route, useRouteMatch, Switch, Redirect } from 'react-router-dom';

import DashboardScreen from './DashboardScreen';
import HomeScreen from './HomeScreen';
import WelcomeScreen from './WelcomeScreen';
import CalendarWeekScreen from './CalendarWeekScreen';
import NotFound from '../../components/NotFound';
import  ProtectedRoute  from '../../hoc/ProtectedRoute';


const AdminScreen = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={path} exact>
        <Redirect to={`${path}/welcome`} />
      </Route>
      <Route path={`${path}/welcome`} exact>
        <WelcomeScreen />
      </Route>
      <ProtectedRoute path={`${path}/home`} exact>
        <HomeScreen />
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/dashboard`} exact>
        <DashboardScreen />
      </ProtectedRoute>
      <ProtectedRoute path={`${path}/calendar`} exact>
        <CalendarWeekScreen />
      </ProtectedRoute>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
};

export default AdminScreen;