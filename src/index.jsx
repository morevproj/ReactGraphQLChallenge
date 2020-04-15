import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './app';

import { gql } from 'apollo-boost';


const QUERY = gql`
{
  search(query: "org:morevproj", type: REPOSITORY, last:100) {
    nodes {
      ... on Repository {
        nameWithOwner
        refs(first: 100, refPrefix: "refs/heads/") {
          nodes {
            name
            target {
              ... on Commit {
                oid
                committedDate
              }
            }
          }
        }
      }
    }
  }
}
`

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        Authorization: 'bearer ' + 'a6b84968ab21752b55e4b1b5e1de5108e7a9f36c',
      }
    })
  }
})

const app = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(app, document.getElementById('app'));