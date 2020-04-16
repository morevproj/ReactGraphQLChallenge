import * as actionTypes from './actionTypes';
import { gql } from 'apollo-boost';
import apolloClient from '../graphql/client';


const REPOSITORIES_QUERY = gql`
query getRepos($username: String!){
  user(login: $username) {
    repositories(last: 100) {
      nodes {
        name,
        updatedAt,
        createdAt,
				description,
        databaseId,
        defaultBranchRef {
          name
        },
        id,
      }
    }
  }
}
`

export const getRepositories = (username, token) => {
  return {
    username,
    token,
    type: actionTypes.GET_REPOSITORIES,
  }
}

export const storeRepositories = (repositories) => {
  // some trick to get clear data
  return {
    type: actionTypes.GET_REPOSITORIES,
    repos: repositories
  }
}

export const loadingFailed = () => {
  return {
    type: actionTypes.LOADING_FAILED
  }
}

export const fetchRepositories = (username, token) => {
  return dispatch => {
    dispatch(getRepositories(username, token));
    console.log('Fetching');
    apolloClient.query({
      query: REPOSITORIES_QUERY,
      variables: {
        username: username
      },
      context: {
        headers: {
          Authorization: `bearer ${token}`,
        }
      }
    }).then(result => console.log(result))
      .catch(err => console.log(err))
  }
}

export const saveToken = token => {
  console.log(token)
  return {
    type: actionTypes.SAVE_TOKEN,
    token
  }
}