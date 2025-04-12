import  { useEffect } from 'react';
import { Button, Form, Image, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { CONFIRM_PASS_VALIDATION, PASSWORD_VALIDATION } from '../../services/validation/validation';
import logo from "../../../assets/images/PMSlogo.png";
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { USER_URLS } from '../../services/api/apiConfig';
import axios from 'axios';
import { ChangePassProps, FormValues } from '../../Interfaces/AuthInterfaces';
import useTogglePassword from '../../hooks/useTogglePassword';


export default function ChangePass({ onClose, show }: ChangePassProps) {
  const {showPass,showConfirmPass,showOldPass,handleShowPass,handleConfirmPass,handleOldPass}=useTogglePassword()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
    reset,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await privateAxiosInstance.put(USER_URLS.CHANGE_PASS, data);
      toast.success(response?.data?.message);
      reset();
      onClose();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || '🦄 Something went wrong!');
      } else {
        toast.error('An unexpected error occurred!');
      }
    }
  };

  

  const newPassword = watch('newPassword');
  const confirmNewPassword = watch('confirmNewPassword');

  useEffect(() => {
    if (confirmNewPassword) {
      trigger('confirmNewPassword');
    }
  }, [newPassword, confirmNewPassword, trigger]);

  return (
    <Modal 
      show={show} 
      onHide={onClose} 
      centered 
      className="customLocation changePassModal "
      backdrop={true}
    >
      <Modal.Body className="px-4 py-4 modalText  bgMainColor">
        <div className="text-center mb-4">
          <Image src={logo} alt="logo" className="w-50" />
        </div>
        
        <div className="mb-4">
          <h3 className="text-white fs-7 fw-bold mb-1">Change Your Password</h3>
          <p className="textMain">Enter your details below</p>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} className="changePassForm ">
          <Form.Group className="mb-4">
            <Form.Label className="mb-2 fw-medium textMain">Current Password</Form.Label>
            <div className="input-group border-bottom border-1 bottom-border-only">
              <Form.Control
                type={showOldPass ? "text" : "password"}
                placeholder="Enter your current password"
                className="border-0 shadow-none"
                isInvalid={!!errors.oldPassword}
                {...register('oldPassword', PASSWORD_VALIDATION)}
              />
              <span 
                className="input-group-text bg-transparent border-0"
                onClick={handleOldPass} 
                style={{ cursor: 'pointer' }}
              >
                <i className={`text-secondary ${showOldPass ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
              </span>
            </div>
            {errors.oldPassword && (
              <div className="text-danger mt-1 small">
                {errors.oldPassword.message}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="mb-2  textMain">New Password</Form.Label>
            <div className="input-group border-bottom border-1 bottom-border-only">
              <Form.Control
                type={showPass ? "text" : "password"}
                placeholder="Enter your new password"
                className="border-0 shadow-none"
                isInvalid={!!errors.newPassword}
                {...register('newPassword', PASSWORD_VALIDATION)}
              />
              <span 
                className="input-group-text bg-transparent border-0"
                onClick={handleShowPass} 
                style={{ cursor: 'pointer' }}
              >
                <i className={`text-secondary ${showPass ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
              </span>
            </div>
            {errors.newPassword && (
              <div className="text-danger mt-1 small">
                {errors.newPassword.message}
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="mb-2 fw-medium textMain">Confirm New Password</Form.Label>
            <div className="input-group border-bottom border-1 bottom-border-only">
              <Form.Control
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm your new password"
                className="border-0 shadow-none"
                isInvalid={!!errors.confirmNewPassword}
                {...register('confirmNewPassword', CONFIRM_PASS_VALIDATION(newPassword))}
              />
              <span 
                className="input-group-text bg-transparent border-0"
                onClick={handleConfirmPass} 
                style={{ cursor: 'pointer' }}
              >
                <i className={`text-secondary ${showConfirmPass ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
              </span>
            </div>
            {errors.confirmNewPassword && (
              <div className="text-danger mt-1 small">
                {errors.confirmNewPassword.message}
              </div>
            )}
          </Form.Group>

          <Button 
            type="submit" 
            className="btn btn-submit w-full d-block w-75 mx-auto fw-semibold" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              "Change Password"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}