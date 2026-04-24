import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function NewsClassifier() {
  const isLoggedIn = localStorage.getItem("token") != null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
    alert("Logged out successfully");
    navigate("/login");
  };

  const [text, setText] = useState("");
  const [model, setModel] = useState("ALL");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Auto-growing textarea
  const handleTextChange = (e) => {
    setText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handlePredict = async () => {
    if (!text.trim()) {
      setError("Please enter news text.");
      return;
    }

    setError("");
    setResults(null);
    setLoading(true);

    try {
      const res = await api.post("/predict", {
        text,
        model,
      });

      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-10">
      {/* MAIN CONTENT */}
      <div className="w-full flex justify-center items-center min-h-[80vh] px-4">
    
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-2 text-center">
            🧠 News Classification
          </h2>

          <p className="text-gray-500 text-center mb-4">
            Enter news text and compare predictions across models
          </p>

          {/* TEXTAREA */}
          <textarea
            placeholder="Enter news text..."
            value={text}
            onChange={handleTextChange}
            className="w-full min-h-[60px] max-h-[300px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none overflow-hidden"
          />

          {/* MODEL SELECT */}
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full mt-3 p-2 border rounded-md"
          >
            <option value="ALL">All Models</option>
            <option value="NaiveBayes_BoW">Naive Bayes BoW</option>
            <option value="NaiveBayes_TFIDF">Naive Bayes TFIDF</option>
            <option value="NaiveBayes_BERT">Naive Bayes BERT</option>
            <option value="LSTM_BoW">LSTM BoW</option>
            <option value="LSTM_TFIDF">LSTM TFIDF</option>
            <option value="LSTM_BERT">LSTM BERT</option>
            <option value="FineTuned_BERT">Fine-Tuned BERT</option>
          </select>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 mt-2 text-sm">{error}</p>
          )}

          {/* BUTTONS */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>

            <button
              onClick={() => {
                setText("");
                setResults(null);
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Clear
            </button>
          </div>

          {/* RESULTS */}
          {results && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Results</h3>

              {Object.entries(results).map(([modelName, value]) => (
                <div
                  key={modelName}
                  className="flex justify-between bg-gray-100 p-3 rounded mb-2"
                >
                  <span className="font-medium">{modelName}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsClassifier;