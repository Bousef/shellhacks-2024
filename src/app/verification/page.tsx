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

  const resendVerificationEmail = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await sendEmailVerification(user);
        console.log("Sending success toast"); // Debugging log
        // Display success toast
        toast.success('Verification email sent!', {
          position: "bottom-right",
          autoClose: 10000, // Increased duration
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      } catch (error) {
        console.error(error);
        console.log("Sending error toast"); // Debugging log
        toast.error('Error sending verification email please try again!', {
          position: "bottom-right",
          autoClose: 10000, // Increased duration
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
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
