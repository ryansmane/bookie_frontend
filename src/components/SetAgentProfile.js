import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const SetAgentProfile = props => {
   const [credentials, setCredentials] = useState({
      identity: localStorage.getItem('id'),
      first_name: '',
      last_name: '',
      bio: '',
      genres_of_interest: '',
      is_open_to_queries: false,
      submission_email: localStorage.getItem('email'),
      agency: ''
   });
   const [agencies, setAgencies] = useState();
   const [helpText, setHelpText] = useState('');

   const url = 'http://localhost:8000';
   let config = {
      headers: {
         Authorization: `Token ${localStorage.getItem('token')}`
      }
   };

   useEffect(() => {
       if (localStorage.getItem('agentStatus') === null) {
           props.history.push('/login')
       }
      async function getAgencies() {
         let res1 = await axios.get(`${url}/api/agencies`, config);
         setAgencies(res1.data);
      }

      getAgencies();
   }, []);

   const handleSubmit = e => {
      e.preventDefault();
      console.log(credentials.submission_email)
      async function postAgent() {
         if (credentials.first_name === '' || credentials.last_name === '') {
            setHelpText('First and Last Name Required');
         } else if (credentials.agency === '') {
            setHelpText('Agency Selection Required');
         } else {
            try {
               let res1 = await axios.post(
                  `${url}/api/pop`,
                  credentials,
                  config
               );
               console.log(res1)
               localStorage.setItem('isVerifiedAgent', 'true');
               props.history.push('/');
               window.location.reload()
            } catch (err) {
               setHelpText('Agent Creation Failed');
            }
         }
      }

      postAgent();
   };

   const handleToggle = e => {
      let status = credentials.is_open_to_queries === false ? true : false;
      setCredentials({
         ...credentials,
         is_open_to_queries: status
      });
   };

   return (
      <>
         <h1>Hello Agent {localStorage.getItem('username')}.</h1>
         <h2>Please fill out the form below to create your agent profile:</h2>
         {agencies && (
            <Form>
               <Form.Group controlId='exampleForm.ControlSelect1'>
                  <Form.Label>Agency</Form.Label>
                  <Form.Control
                     onChange={e => {
                        let filtered = agencies.filter(
                           agency => agency.name === e.target.value
                        );

                        setCredentials({
                           ...credentials,
                           agency: filtered[0].id
                        });
                     }}
                     as='select'
                  >
                     <option>Select Your Agency</option>
                     {agencies.map(agency => {
                        return <option>{agency.name}</option>;
                     })}
                  </Form.Control>
                  <Form.Label>
                     <em>
                        Don't see your agency on the list? Click{' '}
                        <Link to='/agency-submit-info'>here</Link>
                     </em>
                  </Form.Label>
               </Form.Group>

               <Form.Group controlId='formBasicText'>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                     onChange={e => {
                        setCredentials({
                           ...credentials,
                           first_name: e.target.value
                        });
                     }}
                     type='text'
                     placeholder='Enter first name'
                  />
               </Form.Group>
               <Form.Group controlId='formBasicText'>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                     onChange={e => {
                        setCredentials({
                           ...credentials,
                           last_name: e.target.value
                        });
                     }}
                     type='text'
                     placeholder='Enter last name'
                  />
               </Form.Group>
               <Form.Group controlId='formBasicCheckbox'>
                  <Form.Label>
                     Are you open to receiving queries?{' '}
                     <em>Leave unchecked if you are not</em>
                  </Form.Label>
                  <Form.Check
                     type='checkbox'
                     onChange={handleToggle}
                     label='Yes'
                  />
               </Form.Group>

               <Form.Group controlId='formBasicEmail'>
                  <Form.Label>
                     Enter your preferred email for receiving queries:
                  </Form.Label>
                  <em>
                     Don't worry. If you are not receiving submissions at this
                     time, authors will not be able to query you.'
                  </em>
                  <Form.Control
                     onChange={e => {
                        setCredentials({
                           ...credentials,
                           submission_email: e.target.value
                        });
                     }}
                     type='email'
                     placeholder=''
                  />
                  <Form.Text className='text-muted'></Form.Text>
               </Form.Group>

               <Form.Group controlId='exampleForm.ControlTextarea1'>
                  <Form.Label>About me</Form.Label>
                  <Form.Control
                     onChange={e => {
                        setCredentials({
                           ...credentials,
                           bio: e.target.value
                        });
                     }}
                     as='textarea'
                     rows='6'
                     placeholder='This will display on your Agent Profile. Feel free to transfer your bio from your agency website our create a new one here. '
                  />
               </Form.Group>

               <Form.Group controlId='formBasicText'>
                  <Form.Label>
                     Genres you prefer to represent (separated by comma):
                  </Form.Label>
                  <Form.Control
                     onChange={e => {
                        setCredentials({
                           ...credentials,
                           genres_of_interest: e.target.value
                        });
                     }}
                     type='text'
                     placeholder='Example: Literary Fiction, YA, Historical Memoirs, Mystery, Romance'
                  />
               </Form.Group>
               <Button
                  onClick={e => handleSubmit(e)}
                  variant='primary'
                  type='submit'
               >
                  Register!
               </Button>
               <p>{helpText}</p>
            </Form>
         )}
      </>
   );
};

export default SetAgentProfile;
