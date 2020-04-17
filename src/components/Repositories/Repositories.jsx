import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Repository from './Repository/Repository';


const Repositories = props => {;
  const requesting = useSelector(state => state.requesting);
  const error = useSelector(state => state.searchError);
  const repositories = useSelector(state => state.repositories);
  
  if (!repositories && !error) {
    return <div className={'Home'}>
      <h2>If you want to get info about user repositories:</h2>
      <ol>
        <li>Enter the token</li>
        <li>Enter the github user's username and submit </li>
      </ol>
    </div>
  }

  if (error) {
    return <h2>Something went wrong... Check out token or username</h2>
  }

  if (requesting) {
    return <h2>Loading data...</h2>
  }
  
  return <div>
    {repositories.map(repo => 
      <Repository 
        name={repo.name}
        key={repo.id}
        id={repo.id}
        owner={repo.owner.login}
        description={repo.description}
        updated={repo.updatedAt}
        {...props}
        />)}
  </div>
}

export default Repositories;