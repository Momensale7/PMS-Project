import logo404 from '../../../assets/404.png'
import logo from './../../../assets/images/PMSlogo.png'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigate= useNavigate() 
  const handleBackToHome=()=>{
    navigate('/dashboard')
  }
  return (

    <div  className='not-found-page container-fluid  position-relative ' >
    <div className="overlay">
    </div>
      <div className='row vh-100'>
        <div className='col-sm-3  '>
          <div className='position-relative z-1'>
          <img src={logo} className='w-75' alt="logo" />
          </div>
            <div className='  d-flex justify-items-end  '>
            <div className='w-75 position-absolute top-50 start-50 translate-middle'>
              <h2 className='h1'>Oops</h2>
              <h4 className='text-orange'>Page not found</h4>
              <p className='w-300'> This Page doesn’t exist or was removed! We suggest you back to home.</p>
              <button onClick={handleBackToHome} className="btn btn-orange px-4 py-2">Back to Home <i className='fa fa-long-arrow-alt-right ms-3'></i></button>
            </div>
            </div>
        
        </div>
      <div className='col-sm-9 not-found  d-flex justify-content-end align-items-end'>
        <img src={logo404} alt="404" className='not-found-img'  />
      </div>
      </div>
    </div>
  )
}

export default NotFound