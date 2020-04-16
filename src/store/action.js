import * as actionTypes from './actionTypes';
import { gql } from 'apollo-boost';
import apolloClient from '../graphql/client';


const REPOSITORIES_QUERY = gql`
query getRepos($username: String!){
  user(login: $username) {
    repositories(last: 100) {
      nodes {
        id,
        owner {
          login
        }
        name,
        updatedAt,
        createdAt,
				description,
        diskUsage,
        forkCount,
        isFork,
        licenseInfo {
          description
        },
        mergeCommitAllowed,
        url,
        primaryLanguage {
          name
        },
        pushedAt

      }
    }
  }
}
`

export const getRepositories = (username, token, renewId) => {
  if (renewId) clearTimeout(renewId);
  return {
    username,
    token,
    type: actionTypes.GET_REPOSITORIES,
  }
}

export const storeRepositories = (repositories) => {
  return {
    type: actionTypes.STORE_REPOSITORIES,
    repositories: repositories
  }
}

export const loadingFailed = () => {
  return {
    type: actionTypes.LOADING_FAILED
  }
}

const saveRepositoriesRenewID = id => {
  return {
    type: actionTypes.SAVE_REPOSITORIES_RENEW_ID,
    renewId: id
  }
}


export const fetchRepositories = (username, token) => {
  return (dispatch, getState) => {
    dispatch(getRepositories(username, token, getState().renewId));
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
    }).then(result => {
      const repositories = result.data.user.repositories.nodes;
      dispatch(storeRepositories(repositories));
      // Bad, should be changed
      const id = setTimeout(() => dispatch(fetchRepositories(username, token)), 60000);
      dispatch(saveRepositoriesRenewID(id));
    })
      .catch(err => {
        dispatch(resetRepositoriesRenewID());
        dispatch(loadingFailed());
    })
  }
}




