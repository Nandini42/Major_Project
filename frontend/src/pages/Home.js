import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart News Classification System
        </h1>

        <p className="max-w-2xl text-lg mb-6">
          Analyze and classify news articles using advanced Machine Learning
          and NLP models with high accuracy.
        </p>

        <button
          onClick={() => navigate("/classifier")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Try Classifier
        </button>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center flex-grow">
        <h2 className="text-3xl font-bold mb-10">What Makes This Powerful?</h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Classification</h3>
            <p>
              Instantly classify news into categories like Sports, Business, and Technology.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">🧠 Multiple ML Models</h3>
            <p>
              Uses models like Naive Bayes, TF-IDF, BERT, and LSTM.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg">
            <h3 className="text-xl font-semibold mb-2">📊 Insightful Results</h3>
            <p>
              Get predictions and compare model outputs.
            </p>
          </div>

        </div>
      </section>

      {/* 🧠 MODELS SECTION (ADDED BACK) */}
      <section className="py-10 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4">Models Used</h2>

        <div className="flex flex-wrap justify-center gap-3 px-4">
  {[
    { name: "Naive Bayes (BoW)", path: "/model/nb-bow" },
    { name: "Naive Bayes (TF-IDF)", path: "/model/nb-tfidf" },
    { name: "Naive Bayes (BERT)", path: "/model/nb-bert" },
    { name: "LSTM (BoW)", path: "/model/lstm-bow" },
    { name: "LSTM (TF-IDF)", path: "/model/lstm-tfidf" },
    { name: "LSTM (BERT)", path: "/model/lstm-bert" },
    { name: "Fine-Tuned BERT", path: "/model/bert" }
  ].map((model, index) => (
    <button
      key={index}
      onClick={() => navigate(model.path)}
      className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600"
    >
      {model.name}
    </button>
  ))}
</div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 bg-gray-900 text-gray-300 text-sm">
        <p>2026 Smart News Classifier</p>
      </footer>

    </div>
  );
};

export default Home;