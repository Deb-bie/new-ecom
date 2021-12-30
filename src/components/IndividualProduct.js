import React from 'react'

const IndividualProduct = ({ individualproduct }) => {

    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualproduct.picture} alt='product-img' />
            </div>

            <div className='product-text title'>{individualproduct.title}</div>
            <div className='product-text description'>{individualproduct.description}</div>
            <div className='product-text price'>{individualproduct.price}</div>
            <div className='btn btn-danger btn-md cart-btn'>ADD TO CART</div>
        </div>
    )
} 

export default IndividualProduct