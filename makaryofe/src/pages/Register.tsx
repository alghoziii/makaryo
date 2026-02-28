"use client";

import React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient, { isAxiosError } from "../services/apiServices";

interface FieldErrors {
  name?: string[];
  email?: string[];
  password?: string[];
}

interface ApiErrorResponse {
  message?: string;
  errors?: FieldErrors;
}

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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

    // Client-side validation
    if (formData.password !== formData.password_confirmation) {
      setFieldErrors({ password: ["Konfirmasi password tidak cocok."] });
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });

      if (response.status >= 200 && response.status < 300) {
        const successMessage =
          typeof response.data === "object" && response.data && "message" in response.data
            ? String((response.data as { message?: string }).message ?? "Registrasi berhasil. Silakan login.")
            : "Registrasi berhasil. Silakan login.";

        setSuccessMessage(successMessage);
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const status = err.response?.status;
        const apiError = err.response?.data as ApiErrorResponse | undefined;

        if (status === 422) {
          if (apiError?.errors) {
            setFieldErrors(apiError.errors);
          }
          setError(apiError?.message ?? "Data registrasi tidak valid.");
        } else if (!err.response) {
          setError("Tidak dapat terhubung ke server. Pastikan backend aktif dan CORS sudah benar.");
        } else {
          setError(apiError?.message ?? "Registrasi gagal. Silakan coba lagi.");
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
      <div className="mb-8 flex justify-center">
        <img src="/assets/images/logos/makaryo.png" alt="Makaryo" className="h-[50px] w-auto" />
      </div>

      {/* Form Card */}
      <div className="w-full rounded-3xl bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* General Error Message */}
          {error && <div className="rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">{error}</div>}

          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukan nama lengkap anda"
              required
              className={`h-[52px] w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-shujia-orange ${fieldErrors.name ? "border-red-500" : "border-shujia-graylight"
                }`}
            />
            {fieldErrors.name && <p className="text-xs text-red-500">{fieldErrors.name[0]}</p>}
          </div>

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
              className={`h-[52px] w-full rounded-2xl border bg-white px-4 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-shujia-orange ${fieldErrors.email ? "border-red-500" : "border-shujia-graylight"
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
                placeholder="Masukan kata sandi anda"
                required
                className={`h-[52px] w-full rounded-2xl border bg-white px-4 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-shujia-orange ${fieldErrors.password ? "border-red-500" : "border-shujia-graylight"
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

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password_confirmation" className="text-sm font-semibold">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="password_confirmation"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Masukan ulang kata sandi anda"
                required
                className="h-[52px] w-full rounded-2xl border border-shujia-graylight bg-white px-4 pr-12 text-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-shujia-orange"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirmPassword ? (
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
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-[52px] w-full rounded-2xl bg-shujia-orange font-semibold text-white transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-sm text-gray-600">
          Sudah mempunyai akun?{" "}
          <Link to="/login" className="font-semibold text-shujia-orange hover:underline">
            Login
          </Link>
        </p>

        {/* Success Alert */}
        {successMessage && (
          <div className="mt-5 overflow-hidden rounded-xl border border-orange-100 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col items-center gap-3 border-l-4 border-shujia-orange p-4 text-center">
              <p className="text-sm font-semibold text-gray-900">Registrasi Berhasil!</p>
              <p className="text-xs text-gray-500">
                🎉 Akun Anda telah berhasil dibuat. Silakan login untuk melanjutkan.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="  px-4 py-2 font-semibold text-shujia-orange hover:underline"
              >
                Lanjut ke Login
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
