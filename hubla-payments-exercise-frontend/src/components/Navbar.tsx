import { Link } from 'react-router-dom';
//import { useAuth0 } from '../contexts/auth0-context';
function Navbar() {
    //const { isLoading, user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return (
        <header>
            <div className="container-fluid position-relative no-side-padding">
                <li><Link className={"nav-link"} to={"/"}> Home </Link></li>

                <li><Link className={"nav-link"} to={"/create"}> Register New </Link></li>

                <li><Link className={"nav-link"} to={"/upload"}> Upload File </Link></li>

                <li><Link className={"nav-link"} to={"/list"}> Transaction List Table </Link></li>

                <li><Link className={"nav-link"} to={"/listSellerBalance"}> Seller Balance List Table </Link></li>
 
            </div>
        </header>
    );
}
export default (Navbar);