"use client"; // Required for Next.js Client Component
import { auth } from '@/app/firebase/config';
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useInView } from 'react-intersection-observer';

const Main = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleLoginClick = () => {
      router.push('/login');
    };

    if (!user) {
        console.log("USER NOT SIGNED IN");
    }

 // Scroll animations for Hero and About sections
  const [refHero, inViewHero] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refAbout, inViewAbout] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [refCallToAction, inViewCallToAction] = useInView({ triggerOnce: true, threshold: 0.2 });

  const controlsHero = useAnimation();
  const controlsAbout = useAnimation();
  const controlsCallToAction = useAnimation();

  useEffect(() => {
    if (inViewHero) {
      controlsHero.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
    if (inViewAbout) {
      controlsAbout.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
    if (inViewCallToAction) {
      controlsCallToAction.start({ opacity: 1, y: 0, transition: { duration: 1 } });
    }
  }, [inViewHero, inViewAbout, inViewCallToAction, controlsHero, controlsAbout, controlsCallToAction]);

  return (
    <div className="bg-blue-950 text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center"
        ref={refHero}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controlsHero}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 text-yellow-500 leading-tight">
            Welcome to Budget Buddy
          </h1>
          <p className="text-lg mb-8 max-w-lg mx-auto text-white">
            Manage your money, track investments, and set budgets effortlessly. Whether you're a beginner or a seasoned expert, Budget Buddy has the tools you need.
          </p>
          <motion.button
            onClick={handleLoginClick}
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-500 text-navy font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-yellow-600 transition-transform"
          >
            Login to Get Started
          </motion.button>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        className="bg-white text-navy py-24 px-4 relative"
        ref={refAbout}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controlsAbout}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold text-yellow-500 mb-10">
            About Budget Buddy
          </h2>
          <p className="text-lg mb-16">
            Budget Buddy is designed to help users take control of their finances. With advanced budgeting tools, investment tracking, and real-time analytics, our platform helps you make informed decisions with ease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-yellow-500 text-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Budgeting Tools</h3>
              <p>Manage your finances effortlessly with advanced budgeting features.</p>
            </motion.div>
            <motion.div
              className="bg-yellow-500 text-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Investment Tracking</h3>
              <p>Track all your investments and analyze their performance in real time.</p>
            </motion.div>
            <motion.div
              className="bg-yellow-500 text-white p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Real-Time Analytics</h3>
              <p>Access real-time analytics and financial insights at your fingertips.</p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-950 text-white py-24" ref={refCallToAction}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={controlsCallToAction}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold text-yellow-500 mb-6">
            Ready to take control of your finances?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of users who trust Budget Buddy for their financial management.
          </p>
          <motion.button
            onClick={handleLoginClick}
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-500 text-navy font-semibold py-3 px-8 rounded-md shadow-lg hover:bg-yellow-600 transition-transform"
          >
            Login to Get Started
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};


export default Main;
