import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const axios = require('axios')

const Signup = props => {
    const url = 'http://localhost:8000'
    const [credentials, setCredentials] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        boolean: "0",
    });
    const [helpText, setHelpText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.password2) {
           setHelpText('Passwords do not match.')
        } else {
            axios.post(`${url}/register`, credentials).then(res => {
           if (res.data.token) {
              if (credentials.boolean === "1") {
                 console.log(res.data)
                 localStorage.setItem('agentStatus', res.data.boolean)
                 localStorage.setItem('id', res.data.id)
                 localStorage.setItem('token', res.data.token)
                 localStorage.setItem('username', res.data.username)
                 props.history.push('/set-agent-profile')
              } else {
              localStorage.setItem('id', res.data.id)
              localStorage.setItem('token', res.data.token)
              localStorage.setItem('username', res.data.username)
              localStorage.setItem('agentStatus', res.data.boolean)
              props.history.push('/agency-list')
              window.location.reload();;
              }
           } else if (res.data.username) {
              setHelpText(res.data.username)
           } else if (res.data.email) {
              setHelpText(res.data.email)
           } else  {
              setHelpText("NOT DEFINED ERROR")
           }
        })
    }
   }

    const toggleCheckboxThenSend = () => {
        let status = credentials.boolean === '0' ? '1' : '0'
        setCredentials({
            ...credentials, 
            boolean: status
        })
    }

   return (
      <>
         <div>
            <p>Sign Up Below!</p>
            <em>Have an account already? <a href='/login'>Login</a></em>
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
                     setCredentials({ ...credentials, password2: e.target.value });
                  }}
                  type='password'
                  placeholder='Confirm Password'
               />
            </Form.Group>
            <Form.Group controlId='formBasicCheckbox'>
               <Form.Check onChange={toggleCheckboxThenSend}type='checkbox' label='Agent?' />
            </Form.Group>
            <Button
               onClick={e => handleSubmit(e)}
               variant='primary'
               type='submit'
            >
               Sign up!
            </Button>
               <p>{helpText}</p>
         </Form>
      </>
   );
};

export default Signup;
