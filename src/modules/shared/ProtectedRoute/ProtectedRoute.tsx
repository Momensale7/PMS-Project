import { Navigate, useLocation } from 'react-router-dom'
import { ReactNode, useContext } from 'react';
import { Authcontext } from '../../AuthContext/AuthContext';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
    const authContext = useContext(Authcontext);
    const role = authContext?.role; 
  const { pathname } =  useLocation()
  if (!localStorage.getItem('token')) return <Navigate to='/login'/>
// * prevent deep link
  if ( role !== 'Manager' && (pathname === '/dashboard/users')) {
    return <Navigate to='/dashboard'/>
  }
  return children;
  
}
