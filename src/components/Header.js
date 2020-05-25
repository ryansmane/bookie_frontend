import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const Header = props => {
   const [userInfo, setUserInfo] = useState({
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      isAgent: localStorage.getItem('agentStatus'),
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token')
   });

   function logout() {
      setUserInfo({});
      localStorage.clear();
      props.history.push('/login');
   }

   return (
      <div className='top-nav'>
         <Link to='/'>
            <h1>Bookmaker</h1>
         </Link>
         {!userInfo.username && (
            <>
               <h3>
                  <Link to='/register'>Register</Link>
               </h3>
               <h3>
                  <Link to='/login'>Login</Link>
               </h3>
            </>
         )}
         {(userInfo.username && userInfo.isAgent === 'false') && (
            <>
               <h3>
                  <Link to='/agency-list'>Literary Agencies</Link>
               </h3>
               <h3>
                  <Link to='/saved-agents'>Saved Agents</Link>
               </h3>
               <div className='login-cont'>
               <h3>{userInfo.username}</h3>
               <button onClick={() => logout()}>Logout</button>
               </div>
            </>
         )}
         {(userInfo.username && userInfo.isAgent) && (
            <>
               <h3>
                  <Link to='/agency-list'>Literary Agencies</Link>
               </h3>
               <h3>
                  <Link to={`/agent/${userInfo.id}`}>My Agent Profile</Link>
               </h3>
               <div className='login-cont'>
                  <h3>{userInfo.username}</h3>
                  <button onClick={() => logout()}>Logout</button>
               </div>
            </>
         )}
      </div>
   );
};

export default withRouter(Header);
