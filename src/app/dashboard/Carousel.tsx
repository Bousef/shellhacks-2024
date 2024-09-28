"use client";
// components/CreditCardCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css"; // Correct theme CSS import
import "slick-carousel/slick/slick.css"; // Correct CSS import

// Image Imports
import { StaticImageData } from 'next/image';
import CapitalOne from './images/capitalOneImg.jpg';
import Capital2 from './images/capitalOneImg2.jpg';
import Discover from './images/discoverImg.png';

interface CreditCard {
  name: string;
  image: StaticImageData; // Change ImageData to string
  description: string;
}

const creditCards: CreditCard[] = [
  {
    name: 'Discover it Student Cash Back',
    image: Discover, // This should be a string URL to the image
    description: "INTRO OFFER: Unlimited Cashback Match for all new cardmembers - only from Discover. Discover will automatically match all the cash back you've earned at the end of your first year! So you could turn $50 cash back into $100. Or turn $100 cash back into $200. There's no minimum spending or maximum rewards. Just a dollar-for-dollar match."
  },
  {
    name: 'Card B',
    image: CapitalOne,
    description: "Enjoy peace of mind with $0 Fraud Liability so that you won't be responsible for unauthorized charges Monitor your credit score with CreditWise from Capital One. It's free for everyone Get access to your account 24 hours a day, 7 days a week with online banking to access your account from your desktop or smartphone, with Capital One's mobile app",
  },
  {
    name: 'Card C',
    image: Capital2,
    description: "No annual or hidden fees, and you can earn unlimited 1.5% cash back on every purchase, every day. See if you're approved in seconds Put down a refundable $200 security deposit to get a $200 initial credit line",
  },
];

const CreditCardCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true, // Changed to true for looping
    speed: 500,
    slidesToShow: 3,  // Show three cards at once
    slidesToScroll: 1,
    centerMode: false, // Set to false for better alignment
    centerPadding: '0', // Remove padding to avoid spacing issues
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Slider {...settings}>
        {creditCards.map((card, index) => (
          <div key={index} className="flex flex-col items-center p-4 transition-transform transform hover:scale-105">
            <img src={card.image.src} alt={card.name} className="w-full h-auto object-cover rounded-md mb-4 shadow-md" />
            <h2 className="text-xl font-semibold text-gray-800">{card.name}</h2>
            <p className="text-gray-600 text-center">{card.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CreditCardCarousel;
