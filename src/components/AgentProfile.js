import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

const Home = props => {
   const [agent, setAgent] = useState({});
   const url = 'http://localhost:8000';
   let config = {
      headers: {
         Authorization: `Token ${localStorage.getItem('token')}`
      }
   };
   useEffect(() => {
      if (localStorage.getItem('agentStatus') === null) {
         props.history.push('/login');
      }
      async function getAgentDetails() {
         let res1 = await axios.get(
            `${url}/api/pop/${props.match.params.id}`,
            config
         );
         let res2 = await axios.get(
            `${url}/api/agencies/${res1.data.agency}`,
            config
         );
         console.log(res2);
         setAgent({
            first_name: res1.data.first_name,
            last_name: res1.data.last_name,
            email: res1.data.submission_email,
            bio: res1.data.bio,
            genres_of_interest: res1.data.genres_of_interest,
            accepting: res1.data.is_open_to_queries,
            agency: res2.data
         });
      }

      getAgentDetails();
      console.log(agent);
   }, []);

   return (
      <>
         {agent.agency && (
            <>
               <h1>
                  {agent.first_name} {agent.last_name}
               </h1>
               <h4>{agent.agency.name}</h4>
            </>
         )}
      </>
   );
};

export default Home;
