import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth0 } from '../contexts/auth0-context';
    
function Home():JSX.Element {
    let navigate = useNavigate();
    //const { isAuthenticated, getIdTokenClaims, user } = useAuth0();

    return (
        <section className="transaction-area section">
        <div className="container">
            <div className="row">
                Welcome to Hubla's seller's transaction dashboard. Choose your option at the navigation bar.
            </div>
        </div>
        </section>
    );
}
export default Home;