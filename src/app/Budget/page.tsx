import OpenAI from "openai";
import React, { useState } from "react";

// === AI Feature ===
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const Budget = () => {
  const [budget, setBudget] = useState<string>(""); // Monthly budget input
  const [savingsGoal, setSavingsGoal] = useState<string>(""); // Monthly savings goal
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({}); // Input for new expenses
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [budgetSuggestions, setBudgetSuggestions] = useState<string>(""); // State for budget suggestions
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // Loading state for budget suggestions
  const [suggestedBudgets, setSuggestedBudgets] = useState<any[]>([]); // State for structured budget suggestions

  // Fetch Completion of AI prompt based on user input
  const fetchCompletion = async () => {
    if (loading) return; // Prevent further calls if already loading
    setLoading(true); // Set loading state to true
  
    // Construct a detailed prompt with a focus on brevity
    const totalExpenses = getTotalExpenses();
    const remainingBudget = getRemainingBudget();
  
    const prompt = `
      I have a monthly budget of $${budget}. 
      My total expenses so far are $${totalExpenses}. 
      I am trying to save $${savingsGoal} this month. 
      Please give me a short, clear financial tip that helps me manage my finances effectively, considering my current expenses and remaining budget of $${remainingBudget}. 
      The tip should be simple and easy to understand for someone with limited access to technology.
    `;
  
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
      });
  
      setTip(completion.choices[0].message.content || "ERROR");
    } catch (error) {
      console.error("Error fetching completion:", error);
      setTip("Error fetching tip. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Fetch Budget Suggestions
  const fetchBudgetSuggestions = async () => {
    if (loadingSuggestions) return;
    if (!budget || !savingsGoal) {
      setBudgetSuggestions("Please enter both your monthly budget and savings goal.");
      return;
    }
    setLoadingSuggestions(true);
  
    const prompt = `
      Based on a monthly budget of $${budget} and a savings goal of $${savingsGoal}, please suggest a simple budget allocation for different categories such as Food, Rent, Utilities, and Entertainment. 
      Provide clear percentage allocations for each category, formatted as: Category, Percentage.
    `;
  
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
      });
  
      const suggestions = completion.choices[0].message.content || "ERROR";
      setBudgetSuggestions(suggestions);
  
      // Parse the suggestions
      const rows = suggestions.split('\n').map(row => {
        const [category, percentage] = row.split(',').map(item => item.trim());
        return { category, percentage };
      }).filter(item => item.category && item.percentage);
  
      setSuggestedBudgets(rows); // Store the parsed suggestions
    } catch (error) {
      console.error("Error fetching budget suggestions:", error);
      setBudgetSuggestions("Error fetching budget suggestions. Please try again.");
    } finally {
      setLoadingSuggestions(false);
    }
  };
  
  // Handle input for the budget
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.value);
  };

  // Handle input for the savings goal
  const handleSavingsGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingsGoal(e.target.value);
  };

  // Handle input for new expenses
  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  // Add a new expense to the list
  const addExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.date && newExpense.description) {
      setExpenses([
        ...expenses,
        {
          id: expenses.length + 1,
          category: newExpense.category!,
          amount: Number(newExpense.amount),
          date: newExpense.date!,
          description: newExpense.description!,
        },
      ]);
      setNewExpense({});
    }
  };

  // Delete an expense
  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Calculate total expenses excluding savings
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => {
      return expense.category.toLowerCase() !== "savings" ? total + expense.amount : total;
    }, 0);
  };

  // Calculate total savings
  const getTotalSavings = () => {
    return expenses.reduce((total, expense) => {
      return expense.category.toLowerCase() === "savings" ? total + expense.amount : total;
    }, 0);
  };

  // Calculate the remaining budget
  const getRemainingBudget = () => {
    const totalExpenses = getTotalExpenses();
    const totalSavings = getTotalSavings();
    return Number(budget) - (totalExpenses + totalSavings); // Subtract both expenses and savings
  };

  // Check if savings goal is met and provide the appropriate message
  const getSavingsGoalMessage = () => {
    const totalSavings = getTotalSavings();

    if (totalSavings >= Number(savingsGoal)) {
      return `Congratulations! You've saved $${totalSavings} and met your savings goal of $${savingsGoal}.`;
    } else {
      return `You have saved $${totalSavings}. You need $${Number(savingsGoal) - totalSavings} more to meet your goal.`;
    }
  };

  return (
    <div className="budget-tab min-h-screen bg-blue-950 rounded-2xl text-white p-8">
      <h2 className="text-4xl font-bold mb-6 text-yellow-500">Budget Planner</h2>
      <div className="my-4 p-4 border border-yellow-500 rounded-md bg-blue-800">
        <h1 className="text-2xl font-bold text-yellow-500 mb-2">AI Assistant</h1>
        <p className="text-white font-bold">{tip || "Your tip will appear here."}</p>
        <button 
          className={`mt-2 px-4 py-2 ${loading ? "bg-gray-500" : "bg-[#FFB74D]"} text-black font-bold rounded transition-all duration-300 hover:bg-yellow-600`}
          onClick={fetchCompletion}
          disabled={loading}
        >
          {loading ? "Loading..." : "Give me a tip"}
        </button>
      </div>

      {/* Input for Monthly Budget */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-2">Monthly Budget</label>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          placeholder="Enter your monthly budget"
        />
      </div>

      {/* Input for Savings Goal */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-2">Monthly Savings Goal</label>
        <input
          type="number"
          value={savingsGoal}
          onChange={handleSavingsGoalChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          placeholder="Enter your savings goal"
        />
      </div>

      {/* Input for New Expense */}
      <div className="mb-8">
        <label className="block text-lg font-bold text-white mb-4">Add Expense</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            name="category"
            value={newExpense.category || ""}
            onChange={handleExpenseChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Self">Self</option>
            <option value="Utilities">Utilities</option>
            <option value="Savings">Savings</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input
            type="number"
            name="amount"
            value={newExpense.amount || ""}
            onChange={handleExpenseChange}
            placeholder="Amount"
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          />
          <input
            type="date"
            name="date"
            value={newExpense.date || ""}
            onChange={handleExpenseChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          />
          <input
            type="text"
            name="description"
            value={newExpense.description || ""}
            onChange={handleExpenseChange}
            placeholder="Description"
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={addExpense}
            className="w-full p-3 bg-[#FFB74D] text-black text-navy font-semibold rounded-md shadow-md hover:bg-yellow-600 transition-all duration-300 font-bold"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Total Non-Savings Expenses and Remaining Budget */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Total Non-Savings Expenses:</h3>
          <span className="text-xl font-bold">${getTotalExpenses()}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Remaining Budget:</h3>
          <span className="text-xl font-bold">${getRemainingBudget()}</span>
        </div>
      </div>

      {/* Suggested Savings Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-yellow-500">Savings Plan</h3>
        <p className="font-bold">{getSavingsGoalMessage()}</p>
      </div>

      <div className="mt-8">
  <button 
    className={`mt-2 px-4 py-2 ${loadingSuggestions ? "bg-gray-500" : "bg-[#FFB74D]"} text-black rounded transition-all duration-300 hover:bg-yellow-600 font-bold`}
    onClick={fetchBudgetSuggestions}
    disabled={loadingSuggestions}
  >
    {loadingSuggestions ? "Loading..." : "Make Me a Budget"}
  </button>
  {budgetSuggestions && (
    <div className="mt-4">
      <h2 className="text-lg font-bold mb-2">Budget Suggestions:</h2>
      <table className="min-w-full bg-blue-800 text-white border border-yellow-500 font-bold">
        <thead>
          <tr>
            <th className="py-2 border-b font-bold">Category</th>
            <th className="py-2 border-b font-bold">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {suggestedBudgets.length > 0 ? (
            suggestedBudgets.map((suggestion, index) => (
              <tr key={index}>
                <td className="py-2 border-b font-bold">{suggestion.category}</td>
                <td className="py-2 border-b font-bold">{suggestion.percentage}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="py-2 text-center font-bold">No suggestions available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )}
</div>


      {/* Expense Table */}
      <br />
      <div className="overflow-auto">
        <table className="min-w-full bg-white border-collapse text-black rounded-lg overflow-hidden font-bold">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 border text-left font-bold">Category</th>
              <th className="py-3 px-6 bg-gray-200 border text-left font-bold">Amount</th>
              <th className="py-3 px-6 bg-gray-200 border text-left font-bold">Date</th>
              <th className="py-3 px-6 bg-gray-200 border text-left font-bold">Description</th>
              <th className="py-3 px-6 bg-gray-200 border text-left font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-6 py-3 font-bold">{expense.category}</td>
                <td className="border px-6 py-3 font-bold">${expense.amount}</td>
                <td className="border px-6 py-3 font-bold">{expense.date}</td>
                <td className="border px-6 py-3 font-bold">{expense.description}</td>
                <td className="border px-6 py-3">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    &#x1F5D1; {/* Trashcan icon */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Budget;
