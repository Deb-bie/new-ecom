import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo/logo_6.svg'
import { auth, db} from '../firebase/config'; 
import { AuthContext} from '../context/context';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from "firebase/firestore"; 
import {useNavigate} from 'react-router';
import Admin from '../pages/Admin';



const Navbar = () => { 

    const navigate = useNavigate();

    const handleSignOut = async() => {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: false,
        });
        await signOut(auth);

        // navigate('/')
    }

    // const user = useContext(AuthContext);
    // const currentUser = useAuth()



    return (
        <div className="navbar">
            <div className="leftside">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>


            <div className="rightside">

                    {auth.currentUser ? (
                        <>
                            <Link to='/signin'>{auth.currentUser.email}</Link>
    
                            <Link to='#'>Cart</Link>
    
                            <Link to='/' onClick={handleSignOut}>Sign Out</Link>
                        </>
                    ) : ( 
    
                        
                        <>
                            <Link to='signup'>SIGN UP</Link>
    
                            <Link to='signin'>SIGN IN</Link>
                        </>
                        
                    )}
                
            </div>

        </div>
    )
}

export default Navbar
  