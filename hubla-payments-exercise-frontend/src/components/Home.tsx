import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAuth0 } from '../contexts/auth0-context';
    
function Home():JSX.Element {
    let navigate = useNavigate();
    //const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
    const [transactions, setTransactions] = useState();
    
    useEffect(() => {
        const fetchTransactions = async (): Promise<any> => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/transaction`);
        const json = await response.json();
        setTransactions(json)
        }
        fetchTransactions();
    }, [])

    return (
        <section className="transaction-area section">
        <div className="container">
            <div className="row">
            
            </div>
        </div>
        </section>
    );
}
export default Home;