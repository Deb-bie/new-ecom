import React from 'react';
import IndividualProduct from './IndividualProduct'

const Products = ({ products }) => {

    return (
        <div className='products-box'>
            {products.map((individualproduct) => (
                <IndividualProduct key={individualproduct.ID} individualproduct={individualproduct} />
            ))}

            {/* <ul>
                {products.map((product) => (
                    <li>
                        {product.title}
                    </li>
                ))}
            </ul> */}
        </div>
    )
} 

export default Products











