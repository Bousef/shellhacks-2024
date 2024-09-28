"use client"; // This tells Next.js to treat the component as a Client Component
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });

      if (res) {
        setEmail('');
        setPassword('');
        router.push('/verification'); // Navigate to verification page upon success
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-2xl space-y-8 transform hover:scale-105 transition-all duration-500 ease-in-out">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-yellow-500 w-full py-3 px-4 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500">{error.message}</p>}
          <div className="text-black">
            <h3>Already have an account? <a className="text-blue-500 hover:underline" href="/login">Log In</a></h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
