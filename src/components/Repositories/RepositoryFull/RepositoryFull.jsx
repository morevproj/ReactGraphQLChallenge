import React from 'react';
import { useSelector } from 'react-redux';
import classes from './RepositoryFull.css';


const RepositoryFull = props => {
  const repository = useSelector(state => state.repositories.find(repo => {
    return repo.id === props.match.params.id;
  }))

  console.log(repository);
  if (repository.owner) repository.owner = repository.owner.login;
  if (repository.primaryLanguage) repository.primaryLanguage = repository.primaryLanguage.name;
  if (repository.licenseInfo) repository.licenseInfo = repository.licenseInfo.description;
  

  return (
    <div className={classes.RepositoryFull}>
      <h1>{repository.name}</h1>
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