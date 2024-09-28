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
                router.push('/dashboard'); // Navigate to dashboard page upon successful login
            }
            setEmail('');
            setPassword('');
        } catch (e) {
            console.log("THERE WAS AN ERROR");
            console.error(e);
        }
    };

    const handleRegisterClick = () => {
        router.push('/sign-up'); // Navigate to sign-up page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                </form>
                <p className="text-sm text-center mt-4">
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
