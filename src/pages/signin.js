import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db} from '../firebase/config';
import { updateDoc, doc } from "firebase/firestore"; 





const Signin = () => {
  

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        errorMsg: [],
        loading: false,
    });

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        }); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ ...data, errorMsg: null, loading: true });

        try {
            const signin = await signInWithEmailAndPassword(auth, email, password);

            await updateDoc(doc(db, 'users', signin.user.uid), {
                isOnline: true,
            });

            setData({
                email: "",
                password: "",
                errorMsg: "",
                loading: false,

            });

            navigate('/')
            
        } catch (error) {
            setData({ ...data, errorMsg: error.message, loading: false });
        } 
    }

    const { email, password, errorMsg, loading } = data;





    return (
            <Container className="d-flex align-items-center justify-content-center" 
            style={{ minHeight: "100%"}}>

                <div className="w-100" style={{ maxWidth: "400px", marginTop: "50px"}}>

                    <Card>
                        <Card.Body>

                        {errorMsg ? <p>{errorMsg}</p> : null}
                            <h2 className="text-center mb-4">Sign In</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control 
                                    type="email" required 
                                    value={email}
                                    name="email"
                                    onChange={handleChange}></Form.Control>
                                </Form.Group>


                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    required value={password}
                                    name="password"
                                    onChange={handleChange}></Form.Control>
                                </Form.Group>

                                <br />

                                <Button 
                                className="w-100" 
                                type="submit" disabled={loading}
                                >
                                    {loading ? "Signing In" : "Sign In"}
                                </Button>
                            </Form>
                        </Card.Body>

                    </Card>

                    {/* <div className="w-100 text-center mt-2">
                        Already have an account? <Link to='/signin'>Log In </Link>
                    </div> */}

                </div>
            </Container>
    )
}

export default Signin;



