import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
const axios = require('axios');

const Header = () => {
    const clearStorage = () => {
        localStorage.clear();
        
    };

    const [isLogged, setBool] = useState(false)
    

    useEffect(() => {

    setBool(localStorage.getItem('agentStatus') === null ? false : true)
        
    }, []);

    return (
        <div className='top-nav'>
            
            
            <h1>BOOKMAKER</h1>
            {localStorage.agentStatus === 'false' && 
            <>
            <Link to='/agency-list'>View Agencies</Link>
            <Link to='/saved-agents'>Saved Agents</Link>
            </>
            }
            {localStorage.agentStatus && (
                <>
                    <Button
                        href="/login"
                        onClick={() => {
                            localStorage.clear();
                            console.log('logging out');
                        }}
                    >
                        Logout
						</Button>
                <h3>{localStorage.username}</h3>
                </>
                
            )}
            
            
            
        </div>
    );
};

export default Header;
