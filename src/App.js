import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import DefaultLayout from './admin/defaultLayout/DefaultLayout';
import routes from './admin/router/routes';
import Login from './common/pages/Login';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "react-tippy/dist/tippy.css";
import Loader from './common/helper/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileContext, UseContext } from './admin/helper/usecontext/useContext';
import Settings from './admin/layout/views/settings/Settings';
import { useContext, useState } from 'react';
import { ApiCheckAmazonConnection } from './admin/api-wrapper/other/ApiSetting';
import { useEffect } from 'react';
import { connectionHandler } from './common/redux/action';

// super Admin //
import SuperAdminRoutes from './superAdmin/router/routes';
import SuperDefaultLayout from './superAdmin/defaultLayout/DefaultLayout';
import { ApiGetPermission } from './admin/api-wrapper/auth/ApiAuth';
function App() {

  const token = localStorage.getItem('sellerToken');
  function RequireAuth() {
    let location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
  }


  function SuperAdminAuth() {
    const superAdminToken = localStorage.getItem('superAdminToken');
    let location = useLocation();
    if (!superAdminToken) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return <Outlet />;
  }

  // window.addEventListener('beforeunload', function (e) {
  //   const location = window.location.pathname;
  //   const token = localStorage.getItem('sellerToken')?localStorage.getItem('sellerToken') : localStorage.getItem('superAdminToken');
  //   if (location !== '/login' && token) {
  //     localStorage.clear();
  //   }
  // });


  return (
    <>
      <ToastContainer />
      <UseContext>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            {
              localStorage.getItem('superAdminToken') ?
                <Route exact path="/" element={<SuperAdminAuth />}>

                  {SuperAdminRoutes?.map((pages, i) => {
                    return (
                      <Route exact path="/" element={<SuperDefaultLayout />}>
                        <Route path={pages.path} exact key={i} element={pages.component} />
                      </Route>
                    )
                  })}
                </Route>
                :
                localStorage.getItem('sellerToken') ?
                  <Route exact path="/" element={<RequireAuth />}>
                    {

                      routes?.map((pages, i) => {
                        return (
                          <Route exact path="/" element={<DefaultLayout />}>
                            <Route path={pages.path} exact key={i} element={pages.component} />
                          </Route>
                        )
                      })
                    }
                  </Route>
                  :
                  <Route path='*' element={<Navigate to="/login" />} />
            }
          </Routes>
        </BrowserRouter>
      </UseContext>
    </>
  );
}

export default App;
