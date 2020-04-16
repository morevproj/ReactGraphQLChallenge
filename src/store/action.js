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

export const getRepositories = (username, token) => {
  return {
    username,
    token,
    type: actionTypes.GET_REPOSITORIES,
  }
}

export const storeRepositories = (repositories) => {

  // console.log('Repos', repositories);

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


const repositoriesAutoRenew = (autoRenewId) => {
  return dispatch => {
    saveRepositoriesRenewID(autoRenewId)
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
    }).then(result => {
      const repositories = result.data.user.repositories.nodes;
      console.log('Success', repositories)
      dispatch(storeRepositories(repositories));
      // Not perfect, should be changed
      dispatch(repositoriesAutoRenew(
        setTimeout(() => fetchRepositories(username, token), 60000)
      ))
    })
      .catch(err => {
        console.log('Error', err);
        dispatch(loadingFailed());
    })
  }
}




