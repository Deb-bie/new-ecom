import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo_6.svg'
import { auth, db} from '../../firebase/config'; 
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from "firebase/firestore"; 
import {useNavigate} from 'react-router';
import './navbar.css'



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
        <nav className="navbar"

        style={{position: "sticky"}}
        
        >
            <div className="leftside">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
            </div>


            <div className="rightside">

                    {auth.currentUser ? (
                        <>
                            <Link to='/signin' className="l">{auth.currentUser.email}</Link>


                            {auth.currentUser.email === "admin@admin.com" ? (

                                <Link to='/products' className="l">Dashboard</Link>

                            ) : (
                                <Link to='#' className="l">Cart</Link>

                            )}

                            <Link to='/' onClick={handleSignOut} className="l">Sign Out</Link>


                        </>
              
                    ) : (
                        <>
                            <>
                                <Link to='signup' className="l">SIGN UP</Link>
        
                                <Link to='signin' className="l">SIGN IN</Link>
                            </>

                        </>
                    ) }
                
            </div>

        </nav>
    )
}

export default Navbar
  