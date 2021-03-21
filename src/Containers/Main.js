import React from 'react';
import Home from '../Components/Home';
import ClipboardInput from '../Components/ClipboardInput';
import Header from '../Components/Header';
import { Route, Router, withRouter } from 'react-router-dom';
import history from '../Utilities/history';

class Main extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <Route component={Home} path='/' exact />
          <Route component={ClipboardInput} path='/clipboard' />
        </Router>
      </div>
    );
  }
}

export default Main;
