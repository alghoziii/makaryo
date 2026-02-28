"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
}

export default function UserPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const getFirstName = (fullName: string) => {
    return fullName.split(" ")[0];
  };

  return (
    <main className="relative mx-auto min-h-screen w-full max-w-[640px] bg-white pb-24">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h1 className="text-2xl font-bold">Akun</h1>
        <button onClick={handleLogout} className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-gray-100" title="Logout">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
        </button>
      </header>

      {/* Profile Card */}
      <section className="px-5 pt-5">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-300 flex-shrink-0">
            <img
              src="/assets/images/photos/photo-1.png"
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=" + (user?.name || "User");
              }}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold">Hai, {user ? getFirstName(user.name) : "User"}</h2>
            <p className="text-sm text-gray-600">Selamat Datang</p>
          </div>
        </div>
      </section>

      {/* Pengaturan Akun */}
      <section className="mt-6 px-5">
        <h3 className="mb-3 text-base font-bold text-gray-800">Pengaturan Akun</h3>
        <div className="space-y-1 rounded-lg border border-gray-200 bg-white overflow-hidden">
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-orange-500">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Notifikasi</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="mx-4 border-t border-gray-100" />
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Akun</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="mx-4 border-t border-gray-100" />
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Alamat</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </section>

      {/* Pengaturan Lainya */}
      <section className="mt-6 px-5">
        <h3 className="mb-3 text-base font-bold text-gray-800">Pengaturan Lainya</h3>
        <div className="space-y-1 rounded-lg border border-gray-200 bg-white overflow-hidden">
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-orange-500">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Pusat Bantuan</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="mx-4 border-t border-gray-100" />
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-orange-500">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Kebijakan Privasi</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <div className="mx-4 border-t border-gray-100" />
          <button className="flex w-full items-center justify-between px-4 py-4 transition-all hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-orange-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">Versi App</span>
            </div>
            <span className="text-sm text-gray-500">v1.0.0</span>
          </button>
        </div>
      </section>

      <nav className="fixed bottom-5 left-0 right-0 z-30 mx-auto w-full">
        <div className="mx-auto max-w-[640px] px-5">
          <div className="rounded-[24px] bg-shujia-black px-[20px] py-[14px]">
            <ul className="flex items-center gap-[20.30px]">
              <li className="shrink-0">
                <Link to={`/home`}>
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight transition-all duration-300 hover:border-shujia-orange">
                    <img src="assets/images/icons/note.svg" alt="icon" className="h-[22px] w-[22px] shrink-0" />
                  </div>
                </Link>
              </li>
              <li className="shrink-0">
                <Link to={`/my-booking`}>
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight transition-all duration-300 hover:border-shujia-orange">
                    <img src="assets/images/icons/note.svg" alt="icon" className="h-[22px] w-[22px] shrink-0" />
                  </div>
                </Link>
              </li>
              <li className="shrink-0">
                <a href="#">
                  <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-shujia-graylight transition-all duration-300 hover:border-shujia-orange">
                    <img src="assets/images/icons/chat.svg" alt="icon" className="h-[22px] w-[22px] shrink-0" />
                  </div>
                </a>
              </li>
              <li className="w-full">
                <Link to={`/user`}>
                  <div className="flex items-center justify-center gap-2 rounded-full bg-shujia-orange px-[18px] py-[10px] transition-all duration-300 hover:shadow-[0px_4px_10px_0px_#D04B1E80]">
                    <img src="assets/images/icons/browse.svg" alt="icon" className="h-6 w-6 shrink-0" />
                    <p className="text-sm font-semibold leading-[21px] text-white">User</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </main>
  );
}
