"use client"
import React, { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex w-full max-w-5xl shadow-xl rounded-3xl ">
        {/* Left side with illustration */}
        <div className="hidden md:block w-1/2">
          <div className="  p-8 rounded-l-3xl h-full relative">
            <div className="flex flex-col h-full justify-center">
            <iframe src='https://my.spline.design/untitledcopy-fd96af1be85edd703f72eb24f67f3df4/'  width='100%' height='100%'></iframe>
            </div>
          </div>
        </div>

        {/* Right side with login form */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-3xl md:rounded-l-none">
          <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6">Ready to find the right Talent ?</h1>

            {/* Social login buttons */}
            <button className="w-full mb-4 border border-gray-300 rounded-lg py-2 px-2 flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors duration-200">
              <img src="https://imgs.search.brave.com/vTLhO_pzN0kiabVcKVcP48PrjPGviLQ4mBX6A0nV34c/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEx/L05ldy1Hb29nbGUt/TG9nby00OTd4NTAw/LmpwZw" alt="Google" className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>

            <div className="text-center text-gray-500 mb-6">Or login with email</div>


            {/* Login form */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <input
                  type="email"  
                  placeholder="Email Id"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="text-blue-600 text-sm">
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Your Password"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <div className="text-blue-600 text-sm">
              </div>
              <button 
                type="submit"
                className="w-full bg-[#0373e7] text-white py-2 rounded-lg hover:bg-[#065bb8] transition-colors duration-200"
              >
                Login
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;