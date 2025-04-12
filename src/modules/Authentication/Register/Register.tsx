import React, { JSX, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { puplicAxiosInstance } from '../../services/api/apiInstance';
import { USER_URLS } from '../../services/api/apiConfig';
import { COUNTRY_VALIDATION, EMAIL_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION, USERNAME_VALIDATION } from '../../services/validation/validation';
import regisertAvatar from '../../../assets/images/registerAvatar.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import useTogglePassword from '../../hooks/useTogglePassword';
import { RegisterFormInputs } from '../../Interfaces/AuthInterfaces';


export default function Register(): JSX.Element {
  const [imagePreview, setImagePreview] = useState<string>(regisertAvatar);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const {showPass,showConfirmPass,handleShowPass,handleConfirmPass}=useTogglePassword()
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<RegisterFormInputs>({ mode: 'onChange' });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger]);

 

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const formData = new FormData();
    formData.append('userName', data.userName);
    formData.append('email', data.email);
    formData.append('country', data.country);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    formData.append('confirmPassword', data.confirmPassword);
    if (selectedImage) {
      formData.append('profileImage', selectedImage);
    }
    try {
      const res = await puplicAxiosInstance.post(USER_URLS.REGISTER, formData);
      toast.success(res?.data?.message || '🦄 User Registered!');
      navigate('/verify-account', { state: { email: data.email } });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    }
  };

  return (
    <>
    <div className='lh-1 form '>
      <p className='text-white m-0 p-0 fs-6'>Welcome to pms</p>
      <h3 className="h5 form-heading m-0 p-0"><span className='text-decoration-underline'>C</span>reate New Account</h3>
    </div>
    <form onSubmit={handleSubmit(onSubmit)} className="form  p-4 rounded-3">
       
       <div className='text-center mb-2'>
         <label htmlFor="image" className="form-label"> 
            <input {...register('profileImage')} onChange={handleImageChange} type="file" id="image" className="d-none" />
            <span className="btn btn-upload position-relative">
              <img className='img-full ' src={imagePreview} alt="Regisert Avatar" />
              <i className="fa-solid fa-camera position-absolute top-50 start-50 translate-middle"></i>         
              <div className='overlay'></div>
              </span>
         </label>

       </div>
      
      <div className="row gx-4">
        <div className='col-md-6'>
          <label htmlFor="userName" className='form-label'>Username</label>
          <input {...register('userName', USERNAME_VALIDATION)} id='userName' autoComplete="true" type="text" className="form-control mb-3" placeholder="Enter your name" />
          {errors?.userName && <div className="form-error mb-3">{errors?.userName?.message} </div>}
        </div>

        <div className='col-md-6'>
        <label htmlFor="email" className='form-label'>Email</label>
          <input {...register('email', EMAIL_VALIDATION)} id='email' autoComplete="true" type="email" className="form-control mb-3" placeholder="Enter your E-mail" />
          {errors?.email && <div className="text-danger mb-3">{errors?.email?.message} </div>}
        </div>
      </div>

      <div className="row gx-4">
        <div className='col-md-6'>
        <label htmlFor="country" className='form-label'>Country</label>
          <input {...register('country', COUNTRY_VALIDATION)} id="country" autoComplete="true" type="text" className="form-control mb-3" placeholder="Country" />
          {errors?.country && <div className="text-danger mb-3">{errors?.country?.message} </div>}
        </div>
        <div className='col-md-6'>
        <label htmlFor="phone" className='form-label'>Phone Number</label>
          <input {...register('phoneNumber', PHONE_VALIDATION)} id='phone' autoComplete="true" type="tel" className="form-control mb-3" placeholder="Phone Number" />
          {errors?.phoneNumber && <div className="text-danger mb-3">{errors?.phoneNumber?.message} </div>}
        </div>
      </div>

      <div className="row gx-4 ">
        <div className='col-md-6 position-relative'>
        <label htmlFor="Password" className='form-label'>Password</label>
          <input {...register('password', PASSWORD_VALIDATION)} id='password' autoComplete="true" type={showPass ? "text" : "password"} className="form-control mb-3" placeholder="Password" />
          <button onClick={handleShowPass} type='button' className='btn btn-eye position-absolute '>
            {showPass ? <i className='fa fa-eye'/> : <i className='fa fa-eye-slash'/>}
          </button>
          {errors?.password && <div className="text-danger mb-3">{errors?.password?.message} </div>}
        </div>
        <div className='col-md-6 position-relative'>
        <label htmlFor="confirm-password" className='form-label'>confirm-password</label>
          <input {...register('confirmPassword', {
            required: 'Confirm Password is required',
            validate: (value) => value === password || 'Passwords do not match',
          })} autoComplete="true" type={showConfirmPass ? "text" : "password"} id="confirm-password" className="form-control mb-3" placeholder="Confirm Password" />
          <button onClick={handleConfirmPass} type='button' className='btn btn-eye position-absolute '>
            {showConfirmPass ? <i className='fa fa-eye'/> : <i className='fa fa-eye-slash'/>}
          </button>
          {errors?.confirmPassword && <div className="text-danger mb-3">{errors?.confirmPassword?.message} </div>}
        </div>
      </div>

      {/* <div className='d-flex justify-content-end mb-4'>
        <Link to='/' className='text-decoration-none  text-cus-primary fw-medium fs-6'>Login Now?</Link>
      </div> */}

      <button disabled={isSubmitting} type='submit' className="btn btn-submit w-full d-block w-75 mx-auto fw-semibold">
        {isSubmitting ? <i className='fa fa-spinner fa-spin'></i> : "Save"}</button>
    </form>
  </>
  );
}
