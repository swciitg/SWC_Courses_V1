import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import WelcomeScreen from './screens/admin/WelcomeScreen';
import DashboardScreen from './screens/admin/DashboardScreen';
import Home from './screens/admin/Home';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="bg-bgColor text-navy">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <WelcomeScreen />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/dashboard" exact>
            <DashboardScreen />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>


  );
}

export default App;
