// src/app/home/page.tsx
"use client"; // Add this to make it a Client Component
import React from 'react';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Please log in to access more features.</p>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
};

export default HomePage;
