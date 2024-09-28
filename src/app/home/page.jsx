"use client"; // Required for Next.js Client Component
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

const Home = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    if (!user) {
        console.log("USER NOT SIGNED IN");
        router.push('/sign-up');
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-gray-700">Welcome to the Home Page!</h1>
        <p className="mt-4 text-gray-600">
          You have successfully signed in. Explore the content or features available on this platform.
        </p>
        <button
          onClick={() => alert("Enjoy your stay!")}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:bg-blue-600 transition duration-200"
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Home;
