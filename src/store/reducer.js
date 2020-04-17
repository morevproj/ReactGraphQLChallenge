import * as actionTypes from './actionTypes';

const initialState = {
  searchError: false,
  username: '',
  repositories: null,
  requesting: false,
  token: '',
  renewId: null
}

const getRepositories = (state, action) => {
  return {
    ...state,
    username: action.username,
    token: action.token,
    searchError: false,
    requesting: true,
    renewId: null,
  }
}

const storeRepositories = (state, action) => {
  return {
    ...state,
    searchError: false,
    repositories: action.repositories,
    requesting: false,
    renewId: null
  }
}

const loadingFailed = state => {
  return {
    ...state,
    searchError: true,
    requesting: false,
    renewId: null
  }
}

const saveRepositoriesRenewID = (state, action) => {
  return {
    ...state,
    renewId: action.renewId
  }
}


export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_REPOSITORIES: return getRepositories(state, action);
    case actionTypes.STORE_REPOSITORIES: return storeRepositories(state, action);
    case actionTypes.LOADING_FAILED: return loadingFailed(state);
    case actionTypes.SAVE_REPOSITORIES_RENEW_ID: return saveRepositoriesRenewID(state, action);
    default: return state;
  }
}