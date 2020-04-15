import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import RepositoryFull from './components/Repositories/RepositoryFull/RepositoryFull';
import Repositories from './components/Repositories/Repositories';

import classes from './index.css';


const App = (props) => {
  return (
    <BrowserRouter>
      <Layout >
        <Button/>
        <Switch>
          <Route 
            path='/'
            exact
            component={Repositories} />
          <Route
            path='/repo/'
            render={(props) => <RepositoryFull {...props}/>}
          />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App;