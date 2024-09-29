"use client"; // For Next.js Client Component
import { useState } from "react";

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
  const [creditScoreRange, setCreditScoreRange] = useState<string>(""); // User-selected credit score range
  const [creditCards, setCreditCards] = useState<any[]>([]); // Store fetched credit cards
  const [loading, setLoading] = useState<boolean>(false); // Show loading spinner while fetching data
  const [error, setError] = useState<string | null>(null); // Show error messages if any

  const apiKey = "3e6457500dmsh22e5402c9f9f753p118ec3jsn94dfa46379b6";

  // Fetch credit cards based on selected category and credit score
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

      // Filter by credit score range if applicable
      const filteredData = data.filter((card: any) => {
        if (!creditScoreRange) return true; // No filtering if no credit score range selected
        return (
          creditScoreRange === "600-700"
            ? card.creditScore >= 600 && card.creditScore <= 700
            : creditScoreRange === "700-800"
            ? card.creditScore >= 700 && card.creditScore <= 800
            : creditScoreRange === "800+"
            ? card.creditScore >= 800
            : true
        );
      });

      // Limit to 20 cards
      const limitedCreditCards = filteredData.slice(0, 20);

      // Fetch images for each credit card
      const cardsWithImages = await Promise.all(
        limitedCreditCards.map(async (card: any) => {
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
          return { ...card, image: imageData.imageUrl }; // Assuming `imageUrl` contains the image link
        })
      );

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

      {/* Category Selection Dropdown */}
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

      {/* Loading Spinner */}
      {loading && <p className="text-center mt-4">Loading...</p>}

      {/* Error Message */}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {/* Display Credit Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditCards.map((card, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <img src={card.image} alt={card.name} className="w-full h-32 object-cover mb-4" />
            <h3 className="text-xl font-bold mb-2">{card.cardName}</h3>
            <p className="font-semibold">Issuer: {card.cardIssuer}</p>
            <p className="font-semibold">Category: {card.spendBonusCategoryName}</p>
            <p className="mb-4">{card.spendBonusDesc}</p>
            <a
              href={card.url}
              target="_blank"
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
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
