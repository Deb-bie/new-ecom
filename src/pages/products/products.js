import { DataGrid } from "@material-ui/data-grid";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar.";
import React, { useState , useEffect} from 'react'
import { db } from '../../firebase/config';
import { collection, onSnapshot, setDoc, doc  } from "firebase/firestore"; 
import "./product.css";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";




export default function Product() {

  const navigate = useNavigate();


  const [products, setProducts] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "Products"), 
        (snapshot) => {

            setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        });

        return unsub;
  }, []);


  const handleCellClick = (param, event) => {
    if (param.colIndex === 2) {
      event.stopPropagation();
    }
  };
  
  const handleRowClick = (param, event) => {
  };


  const handleEdit = async(id, img, title, description, stock, price) => {
    navigate("/products/" + id, {
      state: {
        id: id,
        img: img,
        title: title,
        description: description,
        stock: stock,
        price: price
      }
    })
    
  }
    
    
    
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    {
      field: "productImg",
      headerName: "Product Image",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.productImg} alt="" />

            {/* <div style={{color: "blue", fontSize: 18, width: "100%", textAlign: "center"}}>
              {params.row.productTitle}
            </div> */}
          </div>
        );
      },
    },

    {
      field: "productTitle",
      headerName: "Product Title",
      width: 160,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              color: "blue",
              fontSize: 18,
              width: "100%",
              textAlign: "left"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },


    {
      field: "productDescription",
      headerName: "Product Description",
      width: 160,
      renderCell: (cellValues) => {
        return (
          <div
            style={{
              color: "black",
              fontSize: 18,
              width: "100%",
              textAlign: "left"
            }}
          >
            {cellValues.value}
          </div>
        );
      }
    },


    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      width: 120,
      align: "center"
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 120,
      align: "center"
    },


    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => {
        return (
            <EditOutlined className="productListEdit" 
            onClick={() => 
              handleEdit(
                params.row.id, 
                params.row.productImg,
                params.row.productTitle, 
                params.row.productDescription,
                params.row.stock,
                params.row.price
            )}
            
            />
        );
      },
    },


    {
      field: "delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        return (
          <DeleteOutline
            className="productListDelete"
            // onClick={() => handleDelete(params.row.id)}
          />
        );
      },
    },


  ];

  const rows = products.map((product) => (
      {
        id: product.id,
        productImg: product.picture,
        productTitle: product.title,
        productDescription: product.description,
        stock: product.stock,
        price: product.price,
        edit: product.id
      }
  ))

    

  return (


    <>

      <Navbar />

      <div className="add">
        <Sidebar />
        <div style={{ height: 700, marginTop: "20px", marginRight: "20px", flex: 4}}>
          <DataGrid
            rowHeight={120}
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            onCellClick={handleCellClick}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
    </>  
  );
}
