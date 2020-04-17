import React from 'react';

import {updatedTimeOffset} from '../../../utils/time';

import classes from './Repository.css';


const Repository = props => {
  // id, owner, repo name, description
  const repoClickHandler = () => {
    console.log(props);
    props.history.push(`/repo/${props.id}`);
  }

  return (
    <div onClick={repoClickHandler} className={classes.Repository}>
      <h2>{props.name}</h2>
      <p><strong>Owner: </strong>{props.owner}</p>
      {props.description ? 
        <p><strong>Description: </strong>{props.description}</p>
        : null
      }
      <h5>updated: {updatedTimeOffset(props.updated)}</h5>
    </div>
  )
}

export default Repository;