import React from 'react';

import Layout from './hoc/Layout/Layout';
import RepositoriesField from './components/RepositoriesField/RepositoriesField';
import Cockpit from './components/Cockpit/Cockpit';
import classes from './index.css';


const App = (props) => { 
  return (
    <Layout >
      <Cockpit />
      <RepositoriesField />
    </Layout>
  )
}


export default App;