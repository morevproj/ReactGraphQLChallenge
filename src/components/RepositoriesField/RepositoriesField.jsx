import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RepositoryFull from '../Repositories/RepositoryFull/RepositoryFull';
import Repositories from '../Repositories/Repositories';


const RepositoriesField = props => {
  
  return (
    <div>
      <Switch>
        <Route
          path='/'
          exact
          render={(props) => <Repositories {...props}/>}
        />
        <Route
          path='/repo/:id'
          render={(props) => <RepositoryFull {...props} />}
        />
        <Redirect to='/' />
      </Switch>
      {props.children}
    </div>)
}


export default RepositoriesField;