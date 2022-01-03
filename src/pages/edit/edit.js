import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import {useNavigate} from 'react-router';
import { db, storage} from '../../firebase/config';
import { doc, setDoc } from "firebase/firestore"; 
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar.';
import { useLocation } from 'react-router-dom'






const Edit = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [data, setData] = useState({
        title: location.state.title,
        description: location.state.description,
        price: location.state.price,
        stock: location.state.stock,
        uploadErrorMsg: "",
        success: "",
        loading: false
    });

    const [image, setImage] = useState(location.state.img)

    const { title, description, price, stock, loading, success, uploadErrorMsg} = data;

    const handleChange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        }); 
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        setData({ ...data, success: null, uploadErrorMsg: null, loading: true });

        try {

            const storageRef = ref(storage, `product-images/${image.name}`);
    
            const snap = await uploadBytes(storageRef, image);
    
            const url = await getDownloadURL(ref(storage, snap.ref.fullPath))


            await setDoc(doc(db, 'Products', location.state.id), {
                title,
                description,
                price,
                stock,
                picture: url,
                path: snap.ref.fullPath
            });

            setData({
                success: "Product Added",
                uploadErrorMsg: "",
    
            });

            // navigate('/products')
        } catch (error) {
            setData({
                ...data, uploadErrorMsg: error.message
           })
        }

    }






    return (

        <>

            <Navbar />

            <div className='add'>

                <Sidebar />

                <Container className="align-items-center justify-content-center" style={{ minHeight: "100%", flex: "2"}}>
                    <div className="w-100" style={{ maxWidth: "400px", marginTop: "20px"}}>

                        
                        <Card>
                            <Card.Body>

                                <h2 className="text-center mb-4">{location.state.title}</h2>

                                {success ? navigate('/products') : null}

                                {uploadErrorMsg ? <p>{uploadErrorMsg}</p> : null}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group>
                                        <Form.Label>Product Title</Form.Label>
                                        <Form.Control 
                                        type="text" required 
                                        value={title}
                                        name="title"
                                        // placeholder={location.state.title}
                                        onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        required 
                                        value={description}
                                        name="description"
                                        placeholder={location.state.description}
                                        onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Product Price</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        required 
                                        value={price}
                                        name="price"
                                        placeholder={location.state.price}
                                        onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Number in Stock</Form.Label>
                                        <Form.Control 
                                        type="number" 
                                        required 
                                        value={stock}
                                        name="stock"
                                        placeholder={location.state.stock}
                                        onChange={handleChange}
                                        ></Form.Control>
                                    </Form.Group>


                                    <Form.Group>
                                        <Form.Label>Upload Product Image</Form.Label>
                                        <Form.Control 
                                        type="file"
                                        id='file' 
                                        // value={image}
                                        required 
                                        accept='image/*'
                                        onChange={(e) => setImage(e.target.files[0])}
                                        ></Form.Control>
                                    </Form.Group>

                                    <br />

                                    <Button 
                                    className="w-100" 
                                    type="submit" 
                                    // disabled={loading}
                                    >

                                        {/* Update  */}
                                        {loading ? "Updating Products" : "Update"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        
                    </div>
                </Container>
            </div>
        </>
    )
}


export default Edit
