import logo from './logo.svg';
import './App.css';
import Main from './Containers/Main';
import { Router, Route } from 'react-router-dom';
import history from './Utilities/history';
import Header from './Components/Header';
import ClipboardInput from './Components/ClipboardInput';
import Home from './Components/Home';

function App() {
  return (
    <div className='App'>
      {/* <Main /> */}
      <Router history={history}>
        <Header />
        <Route component={Home} path='/' exact />
        <Route component={ClipboardInput} path='/clipboard' />
      </Router>
    </div>
  );
}

export default App;
