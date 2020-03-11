import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const AgencyList = props => {
   const [agencies, setAgencies] = useState();
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

   return (
      <>
         {agencies && agencies.map(agency => {
            return (
               <Card style={{ width: '18rem' }}>
                  <Card.Img variant='top' src={agency.image_url} />
                  <Card.Body>
                     <Card.Title>{agency.name}</Card.Title>
                     <Card.Text>{agency.info}</Card.Text>
                     <Link to={`agency/${agency.id}`}><Button variant='primary'>See Inside</Button></Link>
                  </Card.Body>
               </Card>
            );
         })}
      </>
   );
};

export default AgencyList;
