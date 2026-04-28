import React, { useState } from "react";
import api from "../api";

function NewsClassifier() {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");
  const [topic, setTopic] = useState("");
  const [news, setNews] = useState([]);
  const [newsContent, setNewsContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    setPrediction("");
    setTopic("");
    setNews([]);
    setNewsContent("");
    setLoading(true);

    try {
      const res = await api.post("/predict", { text });

      console.log(res.data);

      setPrediction(res.data.prediction);
      setTopic(res.data.topic);
      setNews(res.data.news_articles || []);
      setNewsContent(res.data.news_content || "");

    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setText("");
    setPrediction("");
    setTopic("");
    setNews([]);
    setNewsContent("");
    setError("");
  };

  return (
    <div className="w-full flex justify-center items-center min-h-[80vh] px-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-semibold mb-2 text-center">
          News Classification
        </h2>

        <textarea
          placeholder="Enter news text..."
          value={text}
          onChange={handleTextChange}
          className="w-full min-h-[60px] max-h-[300px] p-3 border rounded-md"
        />

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button
            onClick={handlePredict}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {loading ? "Loading..." : "Predict"}
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>

        {/* RESULT */}
        {prediction && (
          <div className="mt-6 space-y-4">

            {/* Category */}
            <div>
              <h3 className="font-semibold">Category</h3>
              <div className="bg-gray-100 p-3 rounded">{prediction}</div>
            </div>

            {/* Topic */}
            <div>
              <h3 className="font-semibold">Topic</h3>
              <div className="bg-gray-100 p-3 rounded">{topic}</div>
            </div>

            {/* 🔥 News Cards */}
            {news.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Latest News</h3>

                {news.map((n, i) => (
                  <div key={i} className="bg-gray-100 p-3 rounded mb-2">
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 font-semibold"
                    >
                      {n.title}
                    </a>
                    <p className="text-sm text-gray-600">
                      {n.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default NewsClassifier;