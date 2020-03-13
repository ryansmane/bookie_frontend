import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
const axios = require('axios');

const DraftAndSend = () => {

const [agents, setAgents] = useState();
const [draft, setDraft] = useState();
const [parsedDraft, setParsedDraft] = useState();
const url = 'http://localhost:8000';
let config = {
   headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
   }
};

useEffect(()=>{
    
    async function getAgents() {
          let res1 = await axios.get(
             `${url}/user/${localStorage.getItem('id')}`,
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
                agent => splitList.indexOf(agent.identity) !== -1 && agent.is_open_to_queries === true
             );
             setAgents(filtered);
          }
       }

       getAgents();
    
},[draft])

    const compile = e => {
       let str = e.target.value;
       let parser = document.querySelector('.parser');
       let beforeItalics = [];
       let afterItalics = [];
       let beforeBold = [];
       let afterBold = [];
       let concat = [];
       let arr = str.split('');

       for (let i = 0; i < arr.length; i++) {
          if (arr[i] === '*') {
             let j = i + 1;
             let newItalicSet = [];
             while (arr[j] !== '*' && j <= arr.length) {
                newItalicSet.push(arr[j]);
                j++;
             }
             beforeItalics = arr.slice(0, i);
             afterItalics = arr.slice(j + 1);
             beforeItalics.push('<em>' + newItalicSet.join('') + '</em>');
             concat = beforeItalics.concat(afterItalics);
             arr = concat;
          }
          if (arr[i] === ':') {
             let j = i + 1;
             let newBoldSet = [];
             while (arr[j] !== ':' && j <= arr.length) {
                newBoldSet.push(arr[j]);
                j++;
             }
             beforeBold = arr.slice(0, i);
             afterBold = arr.slice(j + 1);
             beforeBold.push('<b>' + newBoldSet.join('') + '</b>');
             concat = beforeBold.concat(afterBold);
             arr = concat;
          }
       }
       
       parser.innerHTML = arr.join('');
       setParsedDraft(parser.innerHTML)
    

    };
    const sendFinal = async (e) => {
        e.preventDefault()
        let content = {
            id: localStorage.getItem('id'),
            body: parsedDraft,
            recipients: "ryanzimmer8@gmail.com",
            subject: "QUERY FOR DYNAMIC"
        }
        let res1 = await axios.post(`${url}/google`, content ,config)
        console.log(res1)
        
    }

    return (
       <>
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
                      compile(e)
                   }}
                   as='textarea'
                   rows='10'
                   placeholder='To Agent,'
                />
             </Form.Group>
          </Form>
          
          <Accordion>
             <Card>
                <Card.Header>
                   <Accordion.Toggle as={Button} variant='link' eventKey='0'>
                      Click for Live Drafting:
                   </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='0'>
                   <Card.Body>
                       <p className='parser'></p>
                   </Card.Body>
                </Accordion.Collapse>
             </Card>
            
          </Accordion>
          <Button onClick={e => sendFinal(e)}>Send</Button>
       </>
    );
}

export default DraftAndSend;