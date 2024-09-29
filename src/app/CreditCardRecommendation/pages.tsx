"use client"; // For Next.js Client Component
import { useState } from "react";
import DefaultImg from '../dashboard/images/discoverImg.png';

// Enum for predefined card categories
const CategoryEnum = {
  TRAVEL: 176638649,
  GROCERY_STORES: 1132334901,
  GAS_STATIONS: 1455345350,
  DINING: 160378660,
  AMAZON: 141708891,
  ALL_RETAIL_STORES: 1321279624,
  MILITARY: 1057789791,
} as const;

const CreditCardRecommendation = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [creditScoreRange, setCreditScoreRange] = useState<string>("");
  const [creditCards, setCreditCards] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = "3e6457500dmsh22e5402c9f9f753p118ec3jsn94dfa46379b6";

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchCreditCards = async () => {
    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://rewards-credit-card-api.p.rapidapi.com/creditcard-spendbonuscategory-categorycard/${selectedCategory}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "rewards-credit-card-api.p.rapidapi.com",
          },
        }
      );

      const data = await response.json();
      console.log(data);
      const filteredData = data
        .filter((card: any) => {
          if (!creditScoreRange) return true;
          return (
            (creditScoreRange === "600-700" && card.creditScore >= 600 && card.creditScore <= 700) ||
            (creditScoreRange === "700-800" && card.creditScore >= 700 && card.creditScore <= 800) ||
            (creditScoreRange === "800+" && card.creditScore >= 800) ||
            true
          );
        }).slice(0, 10);

      const cardsWithImages = [];

      for (let i = 0; i < filteredData.length; i++) {
        const card = filteredData[i];

        await delay(500); // Delay of 500ms between each request

        try {
          const imageResponse = await fetch(
            `https://rewards-credit-card-api.p.rapidapi.com/creditcard-card-image/${card.cardKey}`,
            {
              method: "GET",
              headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "rewards-credit-card-api.p.rapidapi.com",
              },
            }
          );

          const imageData = await imageResponse.json();
          const imageUrl = imageData.cardImageUrl;
          cardsWithImages.push({ ...card, cardImageUrl: imageUrl });
        } catch (imageError) {
          console.error("Error fetching image for card:", card.cardName, imageError);
          cardsWithImages.push({ ...card, cardImageUrl: DefaultImg }); // Use DefaultImg if fetching fails
        }
      }

      setCreditCards(cardsWithImages);
    } catch (error) {
      setError("Failed to fetch credit card data.");
      console.error("Error fetching credit card data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-blue-950 text-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Credit Card Recommendations</h1>

      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2">Select Card Category</label>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className="w-full p-3 text-black rounded-md shadow-sm"
        >
          <option value="">Select Category</option>
          <option value={CategoryEnum.TRAVEL}>Travel</option>
          <option value={CategoryEnum.GROCERY_STORES}>Grocery Stores</option>
          <option value={CategoryEnum.GAS_STATIONS}>Gas Stations</option>
          <option value={CategoryEnum.DINING}>Dining</option>
          <option value={CategoryEnum.AMAZON}>Amazon</option>
          <option value={CategoryEnum.ALL_RETAIL_STORES}>All Retail Stores</option>
          <option value={CategoryEnum.MILITARY}>Military</option>
        </select>
      </div>

      <button
        onClick={fetchCreditCards}
        className="w-full bg-yellow-500 text-blue-950 font-bold p-3 rounded-md shadow-md hover:bg-yellow-600 transition-colors"
      >
        Get Credit Card Recommendations
      </button>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditCards.map((card, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col"
            style={{ minHeight: '400px' }}
          >
            <img
              src={card.cardImageUrl || "https://w7.pngwing.com/pngs/435/433/png-transparent-default-payment-method-card-icon.png"}
              alt={card.cardName}
              className="w-full h-32 object-cover mb-4 rounded-md"
            />
            <div className="flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-2">{card.cardName}</h3>
              <p className="font-semibold">Issuer: {card.cardIssuer}</p>
              <p className="font-semibold">Category: {card.spendBonusCategoryName}</p>
              <p className="mb-4 truncate-100">  {card.spendBonusDesc.length > 100
                ? `${card.spendBonusDesc.slice(0, 100)}...`
                : card.spendBonusDesc}
              </p>
              
            </div>
            <a
              href={card.url}
              className="mt-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreditCardRecommendation;
