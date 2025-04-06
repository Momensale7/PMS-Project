import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import navLogo from '../../../assets/images/navLogo.png'
import profileImage from '../../../assets/images/registerAvatar.png'
import { Authcontext } from '../../AuthContext/AuthContext';
import { useContext } from 'react';

export default function NavBar() {
    const authContext = useContext(Authcontext);
    if (!authContext) {
      throw new Error("Authcontext is not provided");
    }
    const { loginData } = authContext;
  return (
    <Navbar expand="lg" className="bg-white nav ">

      <Navbar.Brand className='py-0' >
        <img src={navLogo} alt="" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto align-items-center  pe-4">
          <Nav.Link className='py-0 border-end'><i className="fa textMain fa-bell"></i></Nav.Link>
          <Nav.Link  className='d-flex align-items-center py-0'>
          
            <img src={profileImage} alt="Profile" className="profileImage" />
            <div className="my-0 py-0">
            <a className="nav-link fs-12 my-0 py-0 text-dark-main" aria-current="page" >{loginData?.userName}</a>
            <a className="nav-link fs-12 my-0 py-0 text-dark-main" aria-current="page" >{loginData?.userEmail}</a>
            </div>
          </Nav.Link>
          <NavDropdown title="" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}