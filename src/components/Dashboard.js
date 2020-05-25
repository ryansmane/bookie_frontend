import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const axios = require('axios');

const Dashboard = () => {
   useEffect(() => {}, []);

   return (
      <>
         <article className='dashboard-article'>
            <h2>About us:</h2>
            <p className='first-p'>
               Bookmaker is an in-progress web service dedicated to pairing literary agents with prospective authors. As this website is currently under development, nothing seen here will be final, though many if not all features shown throughout the website will be available upon final deployment. All agents and agencies are currently fictitious until an Agency-verification system is implemented and the primary feature of the website - aggregate emailing to a list of agents - is currently disables for security reasons relating to Google's Gmail API deprecation. Since the website in its current iteration is serving mainly as proof of itself, I would point anyone interested in the code behind this website to its corresponding <a href='https://github.com/ryansmane/bookie_frontend'>Github repository</a>, as all of its features, online or not, can be viewed there. 
            </p>
            <p>The following nonsense is strictly for aesthetic testing:</p>
            <p>
               loremCupidatat excepteur enim irure labore ut aliquip dolore
               reprehenderit pariatur sint tempor. Enim officia duis duis
               laboris anim occaecat do dolore non excepteur mollit. Ullamco
               tempor irure Lorem ex nisi ullamco. Lorem quis proident id magna
               qui. Culpa reprehenderit dolore id deserunt. Reprehenderit cillum
               magna nisi ullamco magna ut mollit non ipsum aliquip. Aliquip eu
               incididunt ut ad magna amet aliqua et fugiat magna adipisicing ut
               veniam. Voluptate proident est laboris dolor quis cillum
               proident. Fugiat aliqua voluptate est ipsum irure nisi nostrud
               voluptate consectetur reprehenderit dolore anim. Occaecat dolore
               officia adipisicing in tempor dolor proident.
            </p>
            <p>
               loremCupidatat excepteur enim irure labore ut aliquip dolore
               reprehenderit pariatur sint tempor. Enim officia duis duis
               laboris anim occaecat do dolore non excepteur mollit. Ullamco
               tempor irure Lorem ex nisi ullamco. Lorem quis proident id magna
               qui. Culpa reprehenderit dolore id deserunt. Reprehenderit cillum
               magna nisi ullamco magna ut mollit non ipsum aliquip. Aliquip eu
               incididunt ut ad magna amet aliqua et fugiat magna adipisicing ut
               veniam. Voluptate proident est laboris dolor quis cillum
               proident. Fugiat aliqua voluptate est ipsum irure nisi nostrud
               voluptate consectetur reprehenderit dolore anim. Occaecat dolore
               officia adipisicing in tempor dolor proident.
            </p>
            <p>
               loremCupidatat excepteur enim irure labore ut aliquip dolore
               reprehenderit pariatur sint tempor. Enim officia duis duis
               laboris anim occaecat do dolore non excepteur mollit. Ullamco
               tempor irure Lorem ex nisi ullamco. Lorem quis proident id magna
               qui. Culpa reprehenderit dolore id deserunt. Reprehenderit cillum
               magna nisi ullamco magna ut mollit non ipsum aliquip. Aliquip eu
               incididunt ut ad magna amet aliqua et fugiat magna adipisicing ut
               veniam. Voluptate proident est laboris dolor quis cillum
               proident. Fugiat aliqua voluptate est ipsum irure nisi nostrud
               voluptate consectetur reprehenderit dolore anim. Occaecat dolore
               officia adipisicing in tempor dolor proident.
            </p>
         </article>
      </>
   );
};

export default Dashboard;
