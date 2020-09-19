import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CoursePage from './components/CoursePage/CoursePage'
import LandingPage from './components/LandingPage/LandingPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            {/* <Route path='/courses' exact component={AllCoursesPage} /> */}
            <Route path='/courses' exact component={CoursePage} />
            <Route path='/profile' />
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
