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
import {jwtDecode} from "jwt-decode";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";
function App() {

    interface DecodedToken {
        user?: {
            id: string;
            name: string;
            email: string;
        };
        iat?: number;
        exp?: number;
    }

    interface UserData {
        id: string;
        name: string;
        email: string;
        // Add other user properties as needed
    }

    const [, setLoginData] = useState<UserData | null>(null)

    const saveLoginData = (userData: UserData) => {
        setLoginData(userData);
    };

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            try {
                const decodedData = jwtDecode<DecodedToken>(token);
                if (decodedData.user) {
                    setLoginData(decodedData.user);
                }
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
            }
        }
    }, [])

  const routes = createBrowserRouter(
    [
      {
        path:'',
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login saveLoginData={saveLoginData}/>},
          {path:"login",element:<Login saveLoginData={saveLoginData}/>},
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
          <RouterProvider router={routes}></RouterProvider>
          <ToastContainer />

      <Button variant="primary">test</Button>
    </>
  )
}

export default App
