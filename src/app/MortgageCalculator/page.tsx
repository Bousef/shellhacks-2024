"use client"; // For Next.js
import { useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

export default function MortgageCalculator() {
  // State to store input field values, defaulting all to 0
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [homeValue, setHomeValue] = useState<number>(0); 
  const [downpayment, setDownpayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [durationYears, setDurationYears] = useState<number>(30); // Default to 30 years
  const [monthlyHOA, setMonthlyHOA] = useState<number>(0);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(0);
  const [annualHomeInsurance, setAnnualHomeInsurance] = useState<number>(0);

  // State to store the result from the API
  const [mortgageResult, setMortgageResult] = useState<any>(null);

  // State to control the modal
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle API request
  const calculateMortgage = async () => {
    const apiUrl = `https://api.api-ninjas.com/v1/mortgagecalculator?loan_amount=${loanAmount}&home_value=${homeValue}&downpayment=${downpayment}&interest_rate=${interestRate}&duration_years=${durationYears}&monthly_hoa=${monthlyHOA}&annual_property_tax=${annualPropertyTax}&annual_home_insurance=${annualHomeInsurance}`;

    const headers = {
      'X-Api-Key': process.env.NEXT_PUBLIC_API_NINJA_API_KEY || '', // Use your API key from .env.local
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers,
      });
      const data = await response.json();
      setMortgageResult(data); // Store the result in state
      setIsOpen(true); // Open the modal with the result
    } catch (error) {
      console.error('Error fetching mortgage data:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-black">Mortgage Calculator</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Loan Amount</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={loanAmount}
          onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Home Value</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={homeValue}
          onChange={(e) => setHomeValue(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Downpayment</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={downpayment}
          onChange={(e) => setDownpayment(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Interest Rate (%)</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={interestRate}
          onChange={(e) => setInterestRate(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Loan Duration (Years)</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={durationYears}
          onChange={(e) => setDurationYears(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Monthly HOA</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={monthlyHOA}
          onChange={(e) => setMonthlyHOA(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Annual Property Tax</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={annualPropertyTax}
          onChange={(e) => setAnnualPropertyTax(parseFloat(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Annual Home Insurance</label>
        <input
          type="number"
          className="w-full p-2 border rounded text-black font-bold"
          value={annualHomeInsurance}
          onChange={(e) => setAnnualHomeInsurance(parseFloat(e.target.value))}
        />
      </div>

      <button
        className="w-full bg-[#FFB74D] text-black p-2 rounded font-bold"
        onClick={calculateMortgage}
      >
        Calculate Mortgage
      </button>

      {/* Modal for mortgage results */}
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} mortgageResult={mortgageResult} />
    </div>
  );
}

const SpringModal = ({
  isOpen,
  setIsOpen,
  mortgageResult,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mortgageResult: any;
}) => {
  return (
    <AnimatePresence>
      {isOpen && mortgageResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-blue-950/80 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-blue-950 text-white font-bold p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-blue-950 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Mortgage Calculation
              </h3>
              <p className="text-center mb-6">Here are the results of your mortgage calculation:</p>
              <div className="mb-6">
                <p>Estimated Monthly Payment: ${mortgageResult.monthly_payment?.total}</p>
                <p>Mortgage: ${mortgageResult.monthly_payment?.mortgage}</p>
                <p>Property Tax: ${mortgageResult.monthly_payment?.property_tax}</p>
                <p>HOA: ${mortgageResult.monthly_payment?.hoa}</p>
                <p>Annual Home Insurance: ${mortgageResult.monthly_payment?.annual_home_ins}</p>
                <h2 className="text-xl font-bold mt-4">Annual Payment: ${mortgageResult.annual_payment?.total}</h2>
                <p>Total Interest Paid: ${mortgageResult.total_interest_paid}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
