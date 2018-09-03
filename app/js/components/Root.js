import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { browserHistory } from 'react-router';

const Root = ({ store }) => (  
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/:filter?" component={App}/>
      </Switch>
    </Router>
  </Provider>  
);

export default Root;
