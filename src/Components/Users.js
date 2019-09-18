import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

const Users = ({ users, destroyUser , location: { pathname }})=> {
  if(pathname ==='/activeusers'){
    users = users.filter(user => user.active)
  }
  return (
    <ul>
      {
        users.map( user => <li key={ user.id }>
          { user.name }
          <button onClick={()=> destroyUser(user)}>x</button>
        </li>)
      }
    </ul>
  );
};

export default connect(({ users })=> {
  return {
    users
  };
}, (dispatch)=> {
  return {
    destroyUser: (user)=> dispatch(actions.destroyUser(user))
  };
})(Users);
