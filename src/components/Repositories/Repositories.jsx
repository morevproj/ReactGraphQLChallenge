import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';

import * as actions from '../../store/action';


const Repositories = props => {;
  const requesting = useSelector(state => state.requesting);
  const error = useSelector(state => state.searchError);
  const repositories = useSelector(state => state.repositories);
  
  if (!repositories && !error) {
    return <div className={'Home'}>
      <h2>If you want get info about user repositories:</h2>
      <ol>
        <li>Enter token and save it</li>
        <li>Enter github user's username and submit </li>
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
    Repos
  </div>
}

export default Repositories;