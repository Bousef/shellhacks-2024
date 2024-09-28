// src/app/page.tsx
"use client"; // Add this line to make it a Client Component
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const DefaultPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/home'); // Redirect to the home page
  }, [router]);

  return null;
};

export default DefaultPage;
