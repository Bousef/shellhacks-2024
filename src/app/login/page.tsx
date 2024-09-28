"use client"; // Required for Next.js Client Component
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import React, { useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const res = await signInWithEmailAndPassword(email, password);
            console.log({ res });
            if (res) {
                router.push('/home'); // Navigate to home page upon successful login
            }
            setEmail('');
            setPassword('');
        } catch (e) {
            console.log("THERE WAS AN ERROR");
            console.error(e);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-2xl space-y-8 transform hover:scale-105 transition-all duration-500 ease-in-out">
                <h2 className="text-4xl font-extrabold text-center text-gray-900">Sign In</h2>
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

                    {error && <p className="text-red-500">{error.message}</p>}

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-black">
                    <h3>Don't have an account? <a className="text-blue-500 hover:underline" href="/sign-up">Register</a></h3>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
