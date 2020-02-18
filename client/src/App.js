import React, { useEffect } from 'react';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

// Redux setup
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemModal/>
          <ShoppingList/>
        </Container>
      </div>
    </Provider>
  );
}

export default App;
