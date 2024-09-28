"use client";
// components/CreditCardCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css"; // Correct theme CSS import
import "slick-carousel/slick/slick.css"; // Correct CSS import

// Image Imports
import { StaticImageData } from 'next/image';
import BankOfAmerica from './images/boaimage.png';
import CapitalOne from './images/capitalOneImg.jpg';
import Capital2 from './images/capitalOneImg2.jpg';
import Discover from './images/discoverImg.png';

interface CreditCard {
  name: string;
  image: StaticImageData;
  description: string;
}

const creditCards: CreditCard[] = [
  {
    name: 'Discover it Student Cash Back',
    image: Discover,
    description: "INTRO OFFER: Unlimited Cashback Match for all new cardmembers - only from Discover..."
  },
  {
    name: 'Discover it Student Chrome',
    image: Discover,
    description: "INTRO OFFER: Unlimited Cashback Match for all new cardmembers - only from Discover..."
  },
  {
    name: 'Capital One Platinum Secured Credit Card',
    image: CapitalOne,
    description: "No annual or hidden fees, and you can earn unlimited 1.5% cash back on every purchase, every day..."
  },
  {
    name: 'BankAmericard® Secured Credit Card',
    image: BankOfAmerica,
    description: "A secured credit card designed to help establish, strengthen or rebuild credit..."
  },
  {
    name: 'Discover it® Secured Credit Card',
    image: Discover,
    description: "No credit score required to apply. No Annual Fee, earn cash back, and build your credit history..."
  },
  {
    name: 'Capital One Quicksilver Secured Cash Rewards Credit Card',
    image: Capital2,
    description: "No annual or hidden fees, and you can earn unlimited 1.5% cash back on every purchase, every day..."
  },
];

const CreditCardCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    centerPadding: '0',
    arrows: true, // Enable navigation arrows
    responsive: [
      {
        breakpoint: 768, // For tablet and mobile devices
        settings: {
          slidesToShow: 1, // Show one card at a time
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // For larger mobile devices
        settings: {
          slidesToShow: 2, // Show two cards at a time
          slidesToScroll: 1,
        },
      },
    ],
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
