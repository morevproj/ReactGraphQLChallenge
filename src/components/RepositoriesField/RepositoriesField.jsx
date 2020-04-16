import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RepositoryFull from '../Repositories/RepositoryFull/RepositoryFull';
import Repositories from '../Repositories/Repositories';
import Aux from '../../hoc/Aux/Aux';


const RepositoriesField = props => {
  const username = useSelector(state => state.username);
  const token = useSelector(state => state.token);
  
  return (
    <div>
      <Switch>
        <Route
          path='/'
          exact
          render={(props) => <Repositories {...props} 
                                username={username} 
                                token={token}/>}
                                />
        <Route
          path='/repo/:id'
          render={(props) => <RepositoryFull {...props} />}
        />
      </Switch>
      {props.children}
    </div>)
}


export default RepositoriesField;