import React, { useState } from 'react';
import Sidebar from '../layout/sidebar/Sidebar';
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Loader from '../../common/helper/loader/Loader';
import Footer from '../../common/helper/footer/Footer';

function DefaultLayout() {
    const [open, setOpen] = useState(false);
    const Loading = useSelector(state => state.data)

    return (
        <div id="wrapper" className={`${open ? 'toggled' : ''}`}>
            {
                Loading.loader === true &&
                <Loader />
            }

            <Sidebar open={open} setOpen={setOpen} />
            <div className='outlet_wrapper superadmin_wrapper'>
                <Outlet />
            </div>
            <Footer />
        </div>

    )
}

export default DefaultLayout