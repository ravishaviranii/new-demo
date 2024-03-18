import React from 'react'

function Total({ data }) {

    const handleNavigateClick = (route) => {
        window.location.href = route
    }
    return (
        <div className='superAdminTotal'>
            <div className='div_box grid_box'>
                <div className='inner_box purple_border' onClick={() => handleNavigateClick('/vendor')}>
                    <h6>{data?.filterVendors}</h6>
                    <p>New Vendors</p>
                </div>
                <div className='inner_box orange_border' onClick={() => handleNavigateClick('/package')}>
                    <h6>{data?.filterPackages}</h6>
                    <p>New Packages</p>
                </div>
                <div className='inner_box green_border' onClick={() => handleNavigateClick('/vendor-purchase-history')}>
                    <h6>{data?.filterPayments?.INR}₹ / {data?.filterPayments?.USD}$</h6>
                    <p>New Payments</p>
                </div>

            </div>
        </div>
    )
}

export default Total