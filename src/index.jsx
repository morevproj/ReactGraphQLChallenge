import React from 'react';
import { render } from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter} from 'react-router-dom'
import thunk from 'redux-thunk';

import apolloClient from './graphql/client';
import reducer from './store/reducer';
import App from './app';


const store = createStore(reducer, applyMiddleware(thunk));

const app = (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
)

render(app, document.getElementById('app'));