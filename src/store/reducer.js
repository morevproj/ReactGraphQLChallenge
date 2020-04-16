import * as actionTypes from './actionTypes';

const initialState = {
  searchError: false,
  username: '',
  repositories: null,
  requesting: false,
  token: '',
}

const getRepositories = (state, action) => {
  return {
    ...state,
    username: action.username,
    token: action.token,
    searchError: false,
    repositories: null,
    requesting: true
  }
}

const storeRepositories = (state, action) => {
  return {
    ...state,
    searchError: false,
    repositories: action.repositories,
    requesting: false
  }
}

const loadingFailed = state => {
  return {
    ...state,
    searchError: true,
    repositories: null,
    requesting: false,
    username: '',
  }
}

const saveToken = (state, action) => {
  return {
    ...state,
    token: action.token
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_REPOSITORIES: return getRepositories(state, action);
    case actionTypes.STORE_REPOSITORIES: return storeRepositories(state, action);
    case actionTypes.LOADING_FAILED: return loadingFailed(state);
    case actionTypes.SAVE_TOKEN: return saveToken(state, action);
    default: return state;
  }
}