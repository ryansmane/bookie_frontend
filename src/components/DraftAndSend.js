import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { compile } from '../services/Compiler'
const axios = require('axios');

const DraftAndSend = () => {
   const [userInfo, setUserInfo] = useState({
      email: localStorage.getItem('email'),
      username: localStorage.getItem('username'),
      isAgent: localStorage.getItem('agentStatus'),
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token')
   });

   const [agents, setAgents] = useState();
   const [draft, setDraft] = useState();
   const [length, setLength] = useState();
   const [parsedDraft, setParsedDraft] = useState();

   const url = 'https://book-maker-app.herokuapp.com';
   let config = {
      headers: {
         Authorization: `Token ${localStorage.getItem('token')}`,
         Accept: 'application/json'
      }
   };

   useEffect(() => {
      async function getAgents() {
         let res1 = await axios.get(
            `${url}/user/${userInfo.id}`,
            config
         );
         let strList = res1.data.saved_agents;
         if (strList === null) {
            setAgents([]);
         } else {
            let splitList = strList
               .split(',')
               .slice(1)
               .map(str => parseInt(str));
            let res2 = await axios.get(`${url}/api/pop`, config);
            let filtered = res2.data.filter(
               agent =>
                  splitList.indexOf(agent.identity) !== -1 &&
                  agent.is_open_to_queries === true
            );
            setAgents(filtered);
            setLength(filtered.length);
         }
      }

      getAgents();
   }, [draft]);

   
   const sendFinal = async e => {
      e.preventDefault();
      alert('Email authentication currently disabled')
   };

   return (
      <>
      <div className='dashboard-article'>
         <h3>Your Saved Agents</h3>
         <ul>
            {agents &&
               agents.map(agent => {
                  return (
                     <li>
                        Name: {agent.first_name} {agent.last_name} Email:{' '}
                        {agent.submission_email}
                     </li>
                  );
               })}
         </ul>
         <Form>
            <Form.Group controlId='exampleForm.ControlTextarea1'>
               <Form.Label>Your Pitch</Form.Label>
               <Form.Control
                  onChange={e => {
                     setParsedDraft(compile(e));
                  }}
                  as='textarea'
                  rows='10'
                  placeholder='Dear Agent,'
               />
            </Form.Group>
         </Form>

         <Accordion>
            <Card>
               <Card.Header>
                  <Accordion.Toggle style={{color:'purple'}}as={Button} variant='link' eventKey='0'>
                     Click for Live Drafting:
                  </Accordion.Toggle>
               </Card.Header>
               <Accordion.Collapse eventKey='0'>
                  <Card.Body>
                     <p>(*Hello!* = <em>Hello!</em>; :Hello!: = <bold>Hello!</bold>)</p>
                     <p className='parser'></p>
                  </Card.Body>
               </Accordion.Collapse>
            </Card>
         </Accordion>
         <Button className='login-button' onClick={e => sendFinal(e)}>Send To All</Button>
         </div>
      </>
   );
};

export default DraftAndSend;
