import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AdminScreen from './screens/admin/AdminScreen';
import UserScreen from './screens/user/UserScreen';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="bg-bgColor text-navy">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/admin" />
          </Route>
          <Route path="/admin">
            <AdminScreen />
          </Route>
          <Route path="/user">
            <UserScreen />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
