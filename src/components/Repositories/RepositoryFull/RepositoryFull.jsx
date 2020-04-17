import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import ScrollTop from '../../UI/ScrollTop/ScrollTop';

import {updatedTimeOffset} from '../../../utils/time';

import classes from './RepositoryFull.css';


const RepositoryFull = props => {
  const repositoryRow = useSelector(state => state.repositories);
  
  if (!repositoryRow) return <Redirect to='/' />;
  
  const repository = repositoryRow.find(repo => {
    return repo.id === props.match.params.id;
  })

  if (repository.owner) repository.owner = repository.owner.login;
  if (repository.primaryLanguage) repository.primaryLanguage = repository.primaryLanguage.name;
  if (repository.licenseInfo) repository.licenseInfo = repository.licenseInfo.description;
  
  const updated = updatedTimeOffset(repository.updatedAt);

  return (
    <div className={classes.RepositoryFull}>
      <ScrollTop />
      <h1>{repository.name}<span className={classes.UpdateTime}>updated: {updated}</span></h1>
      <ul>
        {Object.keys(repository).map((key, ind) => {
          if (key.startsWith('__')) return null;
          const field = key[0].toUpperCase() + key.slice(1);
          return (
            <li key={ind}>
              <strong>{field}</strong>: {repository[key]}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default RepositoryFull;