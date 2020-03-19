import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
const axios = require('axios');

const AgencyDetail = props => {
   const [agents, setAgents] = useState();
   const [myEmail, setMyEmail] = useState();
   const url = 'http://localhost:8000';
   let config = {
      headers: {
         Authorization: `Token ${localStorage.getItem('token')}`
      }
   };

   useEffect(() => {
      async function getAgents() {
         let res1 = await axios.get(`${url}/api/pop`, config);

         let filtered = res1.data.filter(
            agent => agent.agency === parseInt(props.match.params.id)
         );

         let myself = await axios.get(
            `${url}/user/${localStorage.getItem('id')}`,
            config
         );
         setMyEmail(myself.data.email);

         setAgents(filtered);
      }

      getAgents();
   }, []);

   const saveAgent = async id => {
      let localUsername = localStorage.getItem('username');
      let res1 = await axios.get(
         `${url}/user/${localStorage.getItem('id')}`,
         config
      );
      let beforeList = res1.data.saved_agents;
      let listToBeAdded = beforeList + `, ${id}`;
      let res2 = await axios.put(
         `${url}/user/${localStorage.getItem('id')}`,
         {
            username: localUsername,
            email: myEmail,
            saved_agents: listToBeAdded
         },
         config
      );
      console.log(res1, res2);
   };

   return (
      <>
         <Container className='agent-list'>
            {agents &&
               agents.map(agent => {
                  return (
                     <Card style={{ width: '18rem' }}>
                        {/* <Card.Img variant='top' src='' /> */}
                        <Card.Body>
                           <Card.Title>
                              <h4>{agent.first_name} {agent.last_name}</h4>
                           </Card.Title>
                           <Card.Text>
                              <h6>About me:</h6>
                              <p>{agent.bio}</p>
                           </Card.Text>
                           <Card.Text>
                              <h6>Genres of Interest:</h6>
                              <ul>
                                 {agent.genres_of_interest
                                    .split(',')
                                    .map(item => {
                                       return <li>{item}</li>;
                                    })}
                              </ul>
                           </Card.Text>
                           <Card.Text>
                              {agent.is_open_to_queries ? (
                                 <h6>Accepting Queries</h6>
                              ) : (
                                 <h6>Not Accepting Queries</h6>
                              )}
                           </Card.Text>
                           <Card.Text></Card.Text>
                           <div className='save-and-view'>
                           <Button
                              href={`/agent/${agent.identity}`}
                              variant='primary'
                           >
                              View Agent Profile
                           </Button>
                           {localStorage.getItem('agentStatus') === 'false' && (
                              <Button className='save-agent'
                                 onClick={() => saveAgent(agent.identity)}
                                 variant='primary'
                              >
                                 Save
                              </Button>
                           )}
                           </div>
                        </Card.Body>
                     </Card>
                  );
               })}
         </Container>
      </>
   );
};

export default AgencyDetail;
