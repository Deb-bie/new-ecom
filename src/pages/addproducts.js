import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router';
import { auth, db, storage} from '../firebase/config';
import { addDoc, collection } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';






const AddProducts = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        title: "",
        description: "",
        price: '',
        errorMsg: "",
        uploadErrorMsg: "",
        success: "",
        loading: false,
        user: ""
    });

    const [image, setImage] = useState('')

    // const [success, setSuccess] = useState('')

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        }); 
    }

    
    const { title, description, price, loading, success, errorMsg, uploadErrorMsg} = data;



    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ ...data, errorMsg: null, loading: true });

        try {
            

            // await getDoc(doc(db, "users", auth.currentUser.uid)).then((docSnap) => {
            //     if (docSnap.exists) {
            //         setData({ ...data, user: docSnap.data()})
            //     }
            // })

            // if (auth.currentUser == true) {

            const storageRef = ref(storage, `product-images/${image.name}`);
    
            const snap = await uploadBytes(storageRef, image);
    
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

            await addDoc(collection(db, "Products"), {
                title,
                description,
                price,
                picture: url,
                path: snap.ref.fullPath
            });
    
            setData({
                ...data, 
                title: "",
                description: "",
                price: "",
                success: "Product Added",
                ImgErrorMsg: "",
                loading: false,
    
            });
    
            setImage("");

        }
        
        catch (error) {
            
            setData({
                 ...data, uploadErrorMsg: error.message
            })
        }

            
    }


    



    return (
        <Container className="d-flex align-items-center justify-content-center" 
            style={{ minHeight: "100%"}}>

                <div className="w-100" style={{ maxWidth: "400px", marginTop: "50px"}}>

                    <Card>
                        <Card.Body>

                        {success ? <p>{success}</p> : null} 

                        {uploadErrorMsg ? <p>{uploadErrorMsg}</p> : null}
                            <h2 className="text-center mb-4">Add Products</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Product Title</Form.Label>
                                    <Form.Control 
                                    type="text" required 
                                    value={title}
                                    name="title"
                                    onChange={handleChange}></Form.Control>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Product Description</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    required 
                                    value={description}
                                    name="description"
                                    onChange={handleChange}></Form.Control>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Product Price</Form.Label>
                                    <Form.Control 
                                    type="number" 
                                    required 
                                    value={price}
                                    name="price"
                                    onChange={handleChange}></Form.Control>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Label>Upload Product Image</Form.Label>
                                    <Form.Control 
                                    type="file"
                                    id='file' 
                                    required 
                                    accept='image/*'
                                    onChange={(e) => setImage(e.target.files[0])}></Form.Control>
                                </Form.Group>



                                


                                <br />

                                <Button 
                                className="w-100" 
                                type="submit" disabled={loading}
                                >
                                    {loading ? "Adding Products" : "Add Products"}
                                </Button>
                            </Form>
                        </Card.Body>

                    </Card>

                     

                </div>
            </Container>
    )
}


export default AddProducts;




