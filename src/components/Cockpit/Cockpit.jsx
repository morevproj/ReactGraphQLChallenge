import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/action';

import classes from './Cockpit.css';


const Cockpit = props => {
  const dispatch = useDispatch();
  let [tokenValue, setTokenValue] = useState('');
  let [usernameValue, setUsernameValue] = useState('');

  const onSubmitHandler = () => {
    event.preventDefault();
    dispatch(actions.fetchRepositories(usernameValue, tokenValue));
  }
  
  const onChangeInput = (event, field, entry) => {
    let inputValue = '';
    if (entry === 'paste') inputValue = event.clipboardData.getData('Text');
    if (entry === 'enter') inputValue = event.target.value; 
    if (field === 'token') setTokenValue(inputValue);
    if (field === 'username') setUsernameValue(inputValue);
  }

  const disabled = (!tokenValue || !usernameValue);

  return (
    <form onSubmit={onSubmitHandler} className={classes.CockpitForm}>
      <input 
        type='password' 
        placeholder='Token'
        onChange={(e) => onChangeInput(e, 'token', 'enter')}
        onPaste={(e) => onChangeInput(e, 'token', 'paste')}/>
      <input 
        type={props.type} 
        placeholder='Github Username'
        onChange={(e) => onChangeInput(e, 'username', 'enter')}
        onPaste={(e) => onChangeInput(e, 'username', 'paste')}/>
      <button 
        disabled={disabled}>Submit</button>
    </form>
  )
}


export default Cockpit;