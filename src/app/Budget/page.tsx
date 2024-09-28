import React, { useState } from "react";

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
    <div className="budget-tab min-h-screen bg-blue-950 text-white p-8">
      <h2 className="text-4xl font-bold mb-6 text-yellow-500">Budget Planner</h2>

      {/* Input for Monthly Budget */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-white mb-2">Monthly Budget</label>
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter your monthly budget"
        />
      </div>

      {/* Input for Savings Goal */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-white mb-2">Monthly Savings Goal</label>
        <input
          type="number"
          value={savingsGoal}
          onChange={handleSavingsGoalChange}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          placeholder="Enter your savings goal"
        />
      </div>

      {/* Input for New Expense */}
      <div className="mb-8">
        <label className="block text-lg font-medium text-white mb-4">Add Expense</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            name="category"
            value={newExpense.category || ""}
            onChange={handleExpenseChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="date"
            name="date"
            value={newExpense.date || ""}
            onChange={handleExpenseChange}
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="text"
            name="description"
            value={newExpense.description || ""}
            onChange={handleExpenseChange}
            placeholder="Description"
            className="p-3 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={addExpense}
            className="w-full p-3 bg-yellow-500 text-navy font-semibold rounded-md shadow-md hover:bg-yellow-600 transition-all duration-300"
          >
            Add Expense
          </button>
        </div>
      </div>

      {/* Total Non-Savings Expenses and Remaining Budget */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Total Non-Savings Expenses:</h3>
          <span className="text-xl">${getTotalExpenses()}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Remaining Budget:</h3>
          <span className="text-xl">${getRemainingBudget()}</span>
        </div>
      </div>

      {/* Suggested Savings Plan */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-yellow-500">Savings Plan</h3>
        <p>{getSavingsGoalMessage()}</p>
      </div>

      {/* Expense Table */}
      <div className="overflow-auto">
        <table className="min-w-full bg-white border-collapse text-black rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="py-3 px-6 bg-gray-200 border text-left">Category</th>
              <th className="py-3 px-6 bg-gray-200 border text-left">Amount</th>
              <th className="py-3 px-6 bg-gray-200 border text-left">Date</th>
              <th className="py-3 px-6 bg-gray-200 border text-left">Description</th>
              <th className="py-3 px-6 bg-gray-200 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-6 py-3">{expense.category}</td>
                <td className="border px-6 py-3">${expense.amount}</td>
                <td className="border px-6 py-3">{expense.date}</td>
                <td className="border px-6 py-3">{expense.description}</td>
                <td className="border px-6 py-3">
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-red-500 hover:text-red-700"
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
