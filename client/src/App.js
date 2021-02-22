import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './component/AppNavbar';
import UserProfile from './component/UserProfile';

import { Provider } from 'react-redux'
import store from './store'
import UserModal from './component/UserModal';
import { Container } from 'reactstrap';
import { loadUser } from './action/authAction'

export class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }
  render(){
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <UserModal />
            <UserProfile />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
