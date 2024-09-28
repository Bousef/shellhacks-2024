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
import BankOfAmerica from './images/boaimage.png';

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
    name: 'Discover it Student Chrome',
    image: Discover,
    description: "INTRO OFFER: Unlimited Cashback Match for all new cardmembers - only from Discover. Discover will automatically match all the cash back you've earned at the end of your first year! So you could turn $50 cash back into $100. Or turn $100 cash back into $200. There's no minimum spending or maximum rewards. Just a dollar-for-dollar match."
  },
  {
    name: 'Capital One Platinum Secured Credit Card',
    image: CapitalOne,
    description: "No annual or hidden fees, and you can earn unlimited 1.5% cash back on every purchase, every day. See if you're approved in seconds Put down a refundable $200 security deposit to get a $200 initial credit line"
  },
  {
    name: 'BankAmericard® Secured Credit Card',
    image: BankOfAmerica,
    description: "A secured credit card designed to help establish, strengthen or rebuild credit. Your maximum credit limit will be determined by the amount of the security deposit you provide, your income and your ability to pay the credit line established. If you provide a deposit that exceeds the calculated maximum amount based on your ability to pay, a check will be returned to you for the difference."
  },
  {
    name: 'Discover it® Secured Credit Card',
    image: Discover,
    description:  "No credit score required to apply. No Annual Fee, earn cash back, and build your credit history. Your secured credit card requires a refundable security deposit, and your credit line will equal your deposit amount, starting at $200. Bank information must be provided when submitting your deposit."
  },
  {
    name: 'Capital One Quicksilver Secured Cash Rewards Credit Card',
    image: Capital2,
    description: "No annual or hidden fees, and you can earn unlimited 1.5% cash back on every purchase, every day. See if you're approved in seconds. Put down a refundable $200 security deposit to get a $200 initial credit line."
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
