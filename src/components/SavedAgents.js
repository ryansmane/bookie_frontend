import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const AgencyList = props => {
    const [agents, setAgents] = useState();
    const url = 'http://localhost:8000';
    let config = {
        headers: {
            Authorization: `Token ${localStorage.getItem('token')}`
        }
    };

    useEffect(() => {
        
        async function getAgents() {
            let res1 = await axios.get(`${url}/user/${localStorage.getItem('id')}`, config)
            let strList = res1.data.saved_agents
            console.log(strList)
            if (strList === null) {
                setAgents([])
            } else {
            let splitList = strList.split(',').slice(1).map(str => parseInt(str))
            let res2 = await axios.get(`${url}/api/pop`, config)
            let filtered = res2.data.filter(agent => splitList.indexOf(agent.identity) !== -1)
            setAgents(filtered)
            }
            
        }

        getAgents();
    }, []);

    return (
        <>
            {agents &&
                <>
                <h4>Your saved agents will appear here.</h4>
                {agents.map(agent => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            {/* <Card.Img variant='top' src='' /> */}
                            <Card.Body>
                                {/* {localStorage.getItem('agentStatus') === 'false' && <Button onClick={() => saveAgent(agent.identity)} variant='primary'>
                                    Save
                        </Button>} */}
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
                {agents.length > 0 && <h4>All done? Click <Link to='/draft-and-send'>here</Link> to begin drafting your pitch.</h4>}
                </>}
                
        </>
    );
};

export default AgencyList;
