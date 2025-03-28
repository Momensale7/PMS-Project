import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { USER_URLS } from "../../services/api/apiConfig";
import { puplicAxiosInstance } from "../../services/api/apiInstance";

interface FormData {
  email: string;
}

export default function ForgetPass() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await puplicAxiosInstance.post(
        USER_URLS.FORGET_PASS,
        data
      );
      console.log(response.data);
      navigate("/reset-password");
    } catch (error: any) {
      console.log(
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
          <h1 style={{ textAlign: "left", color: "white" }}>Forget Password</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3" style={{ borderBottom: "1px solid #a5a5a5" }}>
            <label
              className="form-label"
              style={{ color: "var(--color-primary)", fontSize: "12px" }}
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
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="text-danger small">{errors.email.message}</div>
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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
