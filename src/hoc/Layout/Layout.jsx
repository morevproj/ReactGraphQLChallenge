import React, { Fragment } from 'react';


import classes from './Layout.css'

const Layout = props => {
  return (
    <Fragment>
      <div>NavField</div>
      {props.children}
    </Fragment>)
}

export default Layout;