import React, { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

import Dashboard from './components/Dashboard';
import Header from './components/Header';
// import AgentList from './components/AgentList';
import AgencyList from './components/AgencyList';
import AgencyDetail from './components/AgencyDetail';
import SavedAgents from './components/SavedAgents';
import AgentProfile from './components/AgentProfile';
import Footer from './components/Footer';
import DraftAndSend from './components/DraftAndSend';
import AgencySubmitInfo from './components/AgencySubmitInfo';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SetAgentProfile from './components/SetAgentProfile';
import './App.css';


const App = props => {
  

  return (
      <>
      <div className='aggregate'>
         <header>
            <Header />
         </header>
         <main>
            <Switch>
               
               <Route exact path='/' component={Dashboard} />
               <Route exact path='/register' component={Register} />
               <Route exact path='/login' component={Login} />
               <Route exact path='/agency-list' component={AgencyList} />
               <Route exact path='/agency/:id/:name' component={AgencyDetail} />
               <Route exact path='/saved-agents' component={SavedAgents} />
               <Route
                  exact
                  path='/set-agent-profile'
                  component={SetAgentProfile}
               />
               <Route
                  exact
                  path='/agency-submit-info'
                  component={AgencySubmitInfo}
               />
               <Route exact path='/agent/:id' component={AgentProfile} />
               <Route exact path='/draft-and-send' component={DraftAndSend} />

            </Switch>
         </main>
         <footer>
            <Footer/>
         </footer>
         </div>
      </>
   );
}

export default App;
