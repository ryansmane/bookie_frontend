import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const Register = props => {
   const url = 'https://book-maker-app.herokuapp.com';
   const [credentials, setCredentials] = useState({
      username: '',
      email: '',
      password: '',
      password2: '',
      is_agent: false
   });
   const [helpText, setHelpText] = useState('');

   const handleSubmit = e => {
      e.preventDefault();
      if (credentials.password !== credentials.password2) {
         setHelpText('Passwords do not match.');
      } else {
         axios.post(`${url}/register`, credentials).then(res => {
            if (res.data.token) {
               if (credentials.is_agent === true) {
                  console.log(res.data);
                  localStorage.setItem('agentStatus', res.data.boolean ? 'true' : 'false');
                  localStorage.setItem('id', res.data.id);
                  localStorage.setItem('email', res.data.email);
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('username', res.data.username);
                  props.history.push('/set-agent-profile');
               } else {
                  localStorage.setItem('id', res.data.id);
                  localStorage.setItem('email', res.data.email);
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem('username', res.data.username);
                  localStorage.setItem('agentStatus', res.data.boolean ? 'true' : 'false');
                  props.history.push('/');
                  window.location.reload();
               }
            } else if (res.data.username) {
               setHelpText(res.data.username);
            } else if (res.data.email) {
               setHelpText(res.data.email);
            } else {
               setHelpText('NOT DEFINED ERROR');
            }
         });
      }
   };

   const toggleCheckboxThenSend = () => {
      let status = credentials.is_agent === false ? true : false;
      setCredentials({
         ...credentials,
         is_agent: status
      });
   };

   return (
      <div className='login-page'>
         <div>
            <p>Sign Up Below!</p>
            <em>
               Have an account already? <a href='/login'>Login</a>
            </em>
         </div>
         <Form>
            <Form.Group controlId='formBasicText'>
               <Form.Label>Username</Form.Label>
               <Form.Control
                  onChange={e => {
                     setCredentials({
                        ...credentials,
                        username: e.target.value
                     });
                  }}
                  type='text'
                  placeholder='Enter username'
               />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
               <Form.Label>Email address</Form.Label>
               <Form.Control
                  onChange={e => {
                     setCredentials({ ...credentials, email: e.target.value });
                  }}
                  type='email'
                  placeholder='Enter email'
               />
               <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
               </Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
               <Form.Label>Password</Form.Label>
               <Form.Control
                  onChange={e => {
                     setCredentials({
                        ...credentials,
                        password: e.target.value
                     });
                  }}
                  type='password'
                  placeholder='Password'
               />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
               <Form.Label>Confirm Password</Form.Label>
               <Form.Control
                  onChange={e => {
                     setCredentials({
                        ...credentials,
                        password2: e.target.value
                     });
                  }}
                  type='password'
                  placeholder='Confirm Password'
               />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
               <Form.Check
                  onChange={toggleCheckboxThenSend}
                  type='checkbox'
                  label='Agent?'
               />
            </Form.Group>
            <Button
               className='login-button'
               onClick={e => handleSubmit(e)}
               variant='primary'
               type='submit'
            >
               Sign up!
            </Button>
            <p>{helpText}</p>
         </Form>
      </div>
      
   );
};

export default Register;
