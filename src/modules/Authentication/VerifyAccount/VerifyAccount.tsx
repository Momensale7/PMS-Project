import  { JSX } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { puplicAxiosInstance } from '../../services/api/apiInstance';
import { USER_URLS } from '../../services/api/apiConfig';
import { EMAIL_VALIDATION } from '../../services/validation/validation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LocationState, VerifyFormInputs } from '../../Interfaces/AuthInterfaces';


export default function VerifyAccount():JSX.Element {
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<VerifyFormInputs>({
    defaultValues: { email: state?.email || '' },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<VerifyFormInputs> = async (data) => {
    try {
      const res = await puplicAxiosInstance.put<{ message: string }>(USER_URLS.VERIFY, data);
      toast.success(res.data.message || '🦄 Account verified!');
      navigate('/login');
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
      <div className="lh-1 form">
        <p className="text-white m-0 p-0 fs-6">Welcome to PMS</p>
        <h3 className="h5 form-heading m-0 p-0">
          <span className="text-decoration-underline">V</span>erify Account
        </h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form p-4 rounded-3">
        <div className="row gx-4">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              {...register('email', EMAIL_VALIDATION)}
              disabled
              id="email"
              autoComplete="true"
              type="email"
              className="form-control mb-3"
              placeholder="Enter your E-mail"
            />
            {errors.email && <div className="text-danger mb-3">{errors.email.message}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="code" className="form-label">OTP Verification</label>
            <input
              {...register('code', { required: 'OTP is required' })}
              id="code"
              autoComplete="true"
              type="text"
              className="form-control mb-3"
              placeholder="Enter Verification Code"
            />
            {errors.code && <div className="text-danger mb-3">{errors.code.message}</div>}
          </div>
        </div>
        <button disabled={isSubmitting} type="submit" className="btn btn-submit w-full d-block w-75 mx-auto fw-semibold">
          {isSubmitting ? <i className="fa fa-spinner fa-spin"></i> : 'Save'}
        </button>
      </form>
    </>
  );
}
