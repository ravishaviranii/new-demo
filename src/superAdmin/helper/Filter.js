import React, { useState, useContext, useEffect } from 'react'
function Filter({  name }) {
    return (
        <div className='filter_section superadmin_filter'>

            <div className=' inner_filter'  >
                {
                    <p className='heading'>{name}</p>
                }
            </div>

        </div >
    
    )
}

export default Filter