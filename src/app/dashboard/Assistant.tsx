import OpenAI from "openai";
import { useState } from "react";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const Assistant = () => {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  
  const fetchCompletion = async () => {
    if (loading) return; // Prevent further calls if already loading
    setLoading(true); // Set loading state to true

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: "What color are apples?" }],
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

  return (
    <div>
      <h1>Assistant</h1>
      <div className="my-4 p-4 border rounded">
        <p>{tip || "Your tip will appear here."}</p>
      </div>
      <button 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={fetchCompletion}
        disabled={loading}
      >
        {loading ? "Loading..." : "Give me a tip"}
      </button>
    </div>
  );
};

export default Assistant;
