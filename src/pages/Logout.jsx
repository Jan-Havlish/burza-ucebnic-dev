import {  signOut } from "firebase/auth";
import {auth} from '../firebase/config';
import { useNavigate } from 'react-router-dom';

import { useUser } from "../components/UserContext";
 
const Home = () => {
    const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }

    const user = useUser();

    if (!user) {
        navigate("/login");
    }

    else if (user) {
        handleLogout();
    }
   
    return(
        <>
                <p>
                    Logging out
                </p>
 
                
        </>
    )
}
 
export default Home;