import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({ count, location: { pathname } })=> {
  return (
    <div>
      <h1>The Acme Users</h1>
      <nav>
        <Link to='/' className={ pathname === '/' ? 'active': ''}>Home</Link>
        <Link to='/users' className={ pathname === '/users' ? 'active': ''}>Users({ count })</Link>
      </nav>
    </div>
  );
};

const mapStateToProps = ({ users })=> {
  return {
    count: users.length
  };
};

export default connect(mapStateToProps)(Nav);


