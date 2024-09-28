"use client"; // Required for Next.js Client Component
import { auth } from '@/app/firebase/config';
import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import { useRouter } from 'next/navigation';

const EmailVerificationPage = () => {
  const router = useRouter();

  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        alert('Verification email sent!');
      } catch (error) {
        console.error(error);
        alert('Failed to send verification email.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Verify Your Email</h1>
        <p className="text-gray-700 mb-6">
          We have sent a verification link to your email. Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-gray-600">
          If you haven't received the email, please check your spam folder or click the button below to resend the verification link.
        </p>
        <button
          onClick={resendVerificationEmail}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Resend Verification Email
        </button>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
