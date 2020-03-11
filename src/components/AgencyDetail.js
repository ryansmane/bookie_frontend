import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const AgencyDetail = props => {
   const [agents, setAgents] = useState();
   const url = 'http://localhost:8000';
   let config = {
      headers: {
         Authorization: `Token ${localStorage.getItem('token')}`
      }
   };

   useEffect(() => {
      console.log(props);
      async function getAgents() {
         let res1 = await axios.get(`${url}/api/pop`, config);

         let filtered = res1.data.filter(
            agent => agent.agency === parseInt(props.match.params.id)
         );

         setAgents(filtered);
      }

      getAgents();
   }, []);

    const saveAgent = async (id) => {
        let localUsername = localStorage.getItem('username')
        let res1 = await axios.get(`${url}/user/${localStorage.getItem('id')}`)
        let beforeList = res1.data.saved_agents
        let listToBeAdded = beforeList + `, ${id}`
        let res2 = await axios.put(`${url}/user/${localStorage.getItem('id')}`, {username:localUsername, saved_agents: listToBeAdded}, config)
        console.log(res1, res2)
    }

   return (
      <>
         {agents &&
            agents.map(agent => {
               return (
                  <Card style={{ width: '18rem' }}>
                     {/* <Card.Img variant='top' src='' /> */}
                     <Card.Body>
                           {localStorage.getItem('agentStatus') === 'false' && <Button onClick={() => saveAgent(agent.identity)}variant='primary'>
                               Save
                        </Button>}
                        <Card.Title>
                           {agent.first_name} {agent.last_name}
                        </Card.Title>
                        <Card.Text>{agent.bio}</Card.Text>
                        <Button href={`/agent/${agent.identity}`} variant='primary'>
                           View Agent Profile
                        </Button>
                     </Card.Body>
                  </Card>
               );
            })}
      </>
   );
};

export default AgencyDetail;
