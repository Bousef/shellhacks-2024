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
            if (res) {
                router.push('/dashboard'); // Navigate to dashboard page upon successful login
            }
            setEmail('');
            setPassword('');
        } catch (e) {
            console.error(e);
        }
    };

    const handleRegisterClick = () => {
        router.push('/sign-up'); // Navigate to sign-up page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-950">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md hover:scale-105 transition-transform duration-300 ease-in-out">
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">Login</h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition duration-300 ease-in-out text-black"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block text-black w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none hover:border-blue-500 transition duration-300 ease-in-out"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                </form>
                <p className="text-sm text-center text-black mt-4">
                    Don’t have an account?{" "}
                    <button
                        onClick={handleRegisterClick}
                        className="text-blue-500 hover:underline"
                    >
                        Create an Account
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
