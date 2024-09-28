"use client"; // Required for Next.js Client Component
import { auth } from '@/app/firebase/config';
import { sendEmailVerification } from 'firebase/auth';
import React from 'react';
import { useRouter } from 'next/navigation';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailVerificationPage = () => {
  const router = useRouter();

  // Function to handle login button click
  const handleLoginClick = () => {
    router.push('/login');
  };

  // Function to resend the verification email
  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        // Display success toast
        toast.success('Verification email sent!', {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      } catch (error) {
        console.error(error);
        // Display error toast
        toast.error('Error sending verification email, please try again!', {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-blue-950 flex justify-center items-center">
      {/* Back to Login Button on the top left */}
      <button
        onClick={handleLoginClick}
        className="absolute top-4 left-4 bg-white hover:bg-slate-300 text-white font-bold py-2 px-4 rounded-md transition duration-200"
      >
        Back to Login
      </button>

      {/* Email verification box centered */}
      <div className="p-6 bg-white rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Thank You for Signing Up!</h1>

        <p className="text-gray-700 mb-3 font-semibold">
          We have sent a verification link to your email. Please check your inbox and click the link to verify your account.
        </p>
        
        <MarkEmailReadIcon className="text-green-700 text-6xl w-20 h-20 align-self-center" />

        <p className="text-gray-600 mt-3 size-full font-semibold">
          If you haven't received the email, please check your spam folder or click the button below to resend the verification link.
        </p>

        <button
          onClick={resendVerificationEmail}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md transition duration-200"
        >
          Resend Verification Email
        </button>
      </div>

      {/* Toast container to display toasts */}
      <ToastContainer />
    </div>
  );
};

export default EmailVerificationPage;
