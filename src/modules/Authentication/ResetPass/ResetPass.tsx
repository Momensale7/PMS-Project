import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { USER_URLS } from "../../services/api/apiConfig";
import { puplicAxiosInstance } from "../../services/api/apiInstance";
import {
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  OTP_VALIDATION,
} from "../../services/validation/validation";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export default function ResetPass() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const password = watch("password");
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await puplicAxiosInstance.post(
        USER_URLS.RESET_PASS,
        data
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "500px", width: "100%", background: "#315951E5" }}
      >
        <div className="text-center mb-4">
          <h6 style={{ textAlign: "left", color: "white" }}>Welcome to PMS</h6>
          <h1 style={{ textAlign: "left", color: "white" }}>Reset Password</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3" style={{ borderBottom: "1px solid #a5a5a5" }}>
            <label
              className="form-label text-white"
              style={{ fontSize: "12px" }}
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
              }}
              {...register("email", EMAIL_VALIDATION)}
            />
            {errors.email && (
              <div className="text-danger small">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-3 position-relative">
            <label
              className="form-label text-white"
              style={{ fontSize: "12px" }}
            >
              New Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control px-3 py-2"
                placeholder="Enter new password"
                {...register("password", PASSWORD_VALIDATION)}
              />
              <button
                type="button"
                className="btn position-absolute end-0 top-50 translate-middle-y"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", color: "black" }}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <div className="text-danger small">{errors.password.message}</div>
            )}
          </div>

          <div className="mb-3 position-relative">
            <label
              className="form-label text-white"
              style={{ fontSize: "12px" }}
            >
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control px-3 py-2"
                placeholder="Confirm new password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              <button
                type="button"
                className="btn position-absolute end-0 top-50 translate-middle-y"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ background: "none", border: "none", color: "black" }}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="text-danger small">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>

          <div className="mb-3" style={{ borderBottom: "1px solid #a5a5a5" }}>
            <label
              className="form-label text-white"
              style={{ fontSize: "12px" }}
            >
              Seed
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter seed"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
              }}
              {...register("seed", OTP_VALIDATION)}
            />
            {errors.seed && (
              <div className="text-danger small">{errors.seed.message}</div>
            )}
          </div>

          <button
            className="btn w-100"
            style={{
              background: "var(--color-primary)",
              borderRadius: "10rem",
              marginTop: "3rem",
              color: "white",
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
