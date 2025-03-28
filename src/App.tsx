import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Button from "react-bootstrap/Button";
import AuthLayout from './modules/shared/AuthLayout/AuthLayout';
import NotFound from './modules/shared/NotFound/NotFound';
import Login from './modules/Authentication/Login/Login';
import ForgetPass from './modules/Authentication/ForgetPass/ForgetPass';
import ResetPass from './modules/Authentication/ResetPass/ResetPass';
import VerifyAccount from './modules/Authentication/VerifyAccount/VerifyAccount';
import Register from './modules/Authentication/Register/Register';
import MasterLayout from './modules/shared/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  const routes = createBrowserRouter(
    [
      {
        path:'',
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          { path: "register", element: <Register /> },
          { path: "forget-password", element: <ForgetPass /> },
          { path: "reset-password", element: <ResetPass /> },
          { path: "verify-account", element: <VerifyAccount /> },
        ]
      },
      {
        path:'dashboard',
        element:<MasterLayout/>,
        errorElement:<NotFound/>,
        children:[ 
          {index:true,element:<Dashboard/>},          
        ]
      }
    ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );

}

export default App
