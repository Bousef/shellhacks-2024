"use client"; // This tells Next.js to treat the component as a Client Component
import { auth, db } from '@/app/firebase/config';
import { ref, set } from 'firebase/database'; // Importing ref and set functions
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    if (password !== verifyPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(email, password);
      const user = res?.user; // Get the user object from the response

      // Storing user data in the Realtime Database
      await set(ref(db, 'users/' + user?.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      console.log({ user });
      // Clear the form fields
      setEmail('');
      setPassword('');
      setVerifyPassword('');
      setFirstName('');
      setLastName('');
      setErrorMessage('');

      if (user) {
        router.push('/dashboard'); // Navigate to home page upon successful login
      }
    } catch (error: any) { // Use 'any' to access error properties
      if (error.code) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage("This email is already registered.");
            break;
          case 'auth/invalid-email':
            setErrorMessage("Invalid email format.");
            break;
          case 'auth/weak-password':
            setErrorMessage("Password should be at least 6 characters long.");
            break;
          default:
            setErrorMessage("An error occurred. Please try again.");
            break;
        }
      }
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-2xl space-y-8 transform hover:scale-105 transition-all duration-500 ease-in-out">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full text-black mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full text-black mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-black mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <div>
            <label htmlFor="verifyPassword" className="block text-sm font-medium text-gray-700">Verify Password</label>
            <input
              type="password"
              id="verifyPassword"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-300 ease-in-out hover:border-blue-500"
              placeholder="Re-enter your password"
              required
            />
          </div>
          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}
          <button
          type="submit"
          className="bg-yellow-500 w-full py-3 px-4 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md focus:outline-none transition duration-300 ease-in-out"
           >
            Sign Up
          </button>
          <div className="text-black">
            <h3>Already have an account? <a className="text-blue-500 hover:underline" href="/login">Log In</a></h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;