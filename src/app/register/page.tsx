"use client";  // This should be the first line in the file

import { useRouter } from 'next/router';
import React from 'react';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Simulate successful registration and redirect to the verification page
    router.push('/verification');
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950 bg-cover">
      <div className="p-8 w-full max-w-md bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">Create an Account</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-black font-extrabold" htmlFor="username">Username</label>
            <input className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="username" name="username" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black font-extrabold" htmlFor="firstname">First Name</label>
            <input className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="firstname" name="firstname" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black font-extrabold" htmlFor="lastname">Last Name</label>
            <input className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="lastname" name="lastname" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black font-extrabold" htmlFor="password">Password</label>
            <input className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" id="password" name="password" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-black font-extrabold" htmlFor="confirmpassword">Confirm Password</label>
            <input className="w-full p-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" id="confirmpassword" name="confirmpassword" required />
          </div>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-md transition duration-200 shadow-lg" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
