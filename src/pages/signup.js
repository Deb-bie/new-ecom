import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db} from '../firebase/config';
import { collection, addDoc, setDoc, Timestamp, doc } from "firebase/firestore"; 



const Signup = () => {
  
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        errorMsg: [],
        successMsg: "",
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

        if (password != passwordConfirm) {
            setData({ ...data, errorMsg: "Password do not match.", loading: true });
        }

        else if (password != /^[A-Za-z]\w{7,14}$/) {
            setData({ ...data, errorMsg: "Passwords should be equal to 6 letters.", loading: true});
        }


        try {
            const signup = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, 'users', signup.user.uid), {
                uid: signup.user.uid,
                email, 
                password, 
                passwordConfirm, 
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            });

            setData({
                email: "",
                password: "",
                passwordConfirm: "",
                errorMsg: "",
                loading: false,

            });

            navigate('/')
            
        } catch (error) {
            setData({ ...data, errorMsg: error.message, loading: false });
        }

        
    }



    const { email, password, passwordConfirm, errorMsg, successMsg, loading } = data;


    return (
            <Container className="d-flex align-items-center justify-content-center" 
            style={{ minHeight: "100%"}}>

                <div className="w-100" style={{ maxWidth: "400px" , marginTop: "50px"}}>

                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Sign Up</h2>

                            {errorMsg ? <p>{errorMsg}</p> : null}

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
                                    name="password"
                                    required value={password}
                                    onChange={handleChange}
                                    ></Form.Control>
                                </Form.Group>


                                <Form.Group 
                                id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control 
                                    type="password" 
                                    name="passwordConfirm"
                                    required value={passwordConfirm}
                                    onChange={handleChange}>

                                    </Form.Control>
                                </Form.Group>

                                <br />

                                <Button 
                                className="w-100" 
                                type="submit" 
                                disabled={loading}
                                >
                                    Sign Up
                                </Button>
                            </Form>
                        </Card.Body>

                    </Card>

                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to='/signin'>Log In </Link>
                    </div>

                </div>
            </Container>
    )
}

export default Signup;



