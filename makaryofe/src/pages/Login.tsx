"use client";

import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../services/apiServices";

interface FieldErrors {
  email?: string[];
  password?: string[];
}

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      const response = await apiClient.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.data?.token) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
        navigate("/home");
      } else if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/home");
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: {
            status?: number;
            data?: {
              message?: string;
              errors?: FieldErrors;
            };
          };
        };

        // Handle validation errors (422)
        if (axiosError.response?.status === 422 && axiosError.response?.data?.errors) {
          setFieldErrors(axiosError.response.data.errors);
        }
        // Handle invalid credentials (401)
        else if (axiosError.response?.status === 401) {
          setError(axiosError.response?.data?.message || "Email atau password salah.");
        } else {
          setError(axiosError.response?.data?.message || "Login gagal. Silakan coba lagi.");
        }
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-[640px] flex-col items-center justify-center bg-[#F4F5F7] px-5 py-10">
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img src="/assets/images/logos/makaryo.png" alt="Makaryo" className="h-[50px] w-auto" />
      </div>

      {/* Form Card */}
      <div className="w-full rounded-3xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* General Error Message */}
          {error && <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">{error}</div>}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukan email anda"
              required
              className={`h-[52px] w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-shujia-orange ${
                fieldErrors.email ? "border-red-500" : "border-shujia-graylight"
              }`}
            />
            {fieldErrors.email && <p className="text-xs text-red-500">{fieldErrors.email[0]}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-semibold">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className={`h-[52px] w-full rounded-2xl border bg-white px-4 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-shujia-orange ${
                  fieldErrors.password ? "border-red-500" : "border-shujia-graylight"
                }`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
            {fieldErrors.password && <p className="text-xs text-red-500">{fieldErrors.password[0]}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[52px] w-full rounded-2xl bg-shujia-orange font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        {/* Register Link */}
        <p className="mt-5 text-center text-sm text-gray-600">
          Belum mempunyai akun?{" "}
          <Link to="/register" className="font-semibold text-shujia-orange hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </main>
  );
}
