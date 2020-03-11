import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
const axios = require('axios')

const Signup = props => {
    const url = 'http://localhost:8000'
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const [helpText, setHelpText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.clear()
        try {
        let res1 = await axios.post(`${url}/login`, credentials)
        let res2 = await axios.get(`${url}/token/${res1.data.token}`)
        let res3 = await axios.get(`${url}/user/${res2.data.user}`)
        localStorage.setItem('token', res1.data.token)
        localStorage.setItem('username', res3.data.username)
        localStorage.setItem('agentStatus', res3.data.is_agent)
        localStorage.setItem('id', res3.data.id)
        props.history.push('/')
        window.location.reload();
        } catch (e) {
            setHelpText('Invalid Credentials')
        }
    }

    

    return (
        <>
            <div>
    <p>Login Below! (or register a new account {<Link to='/register'>here</Link>}.)</p>
            </div>
            <Form>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email Address</Form.Label>
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
                
                <Button
                    onClick={e => handleSubmit(e)}
                    variant='primary'
                    type='submit'
                >
                    Sign in!
            </Button>
                <p>{helpText}</p>
            </Form>
        </>
    );
};

export default Signup;
