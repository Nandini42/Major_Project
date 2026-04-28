import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chatbot from "./components/ChatBot";
import NewsClassifier from "./components/NewsClassifier";
import NBBoW from "./pages/models/NBBoW";
import NBTfidf from "./pages/models/NBTfidf";
import NBBert from "./pages/models/NBBert";
import LSTMBow from "./pages/models/LSTMBow";
import LSTMTfidf from "./pages/models/LSTMTfidf";
import LSTMBert from "./pages/models/LSTMBert";
import Bert from "./pages/models/Bert";

function App() {
  return (
    <>
      <Navbar />

      {/* 🔹 All pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classifier" element={<NewsClassifier />} />
        <Route path="/model/nb-bow" element={<NBBoW />} />
        <Route path="/model/nb-tfidf" element={<NBTfidf />} />
        <Route path="/model/nb-bert" element={<NBBert />} />
        <Route path="/model/lstm-bow" element={<LSTMBow />} />
        <Route path="/model/lstm-tfidf" element={<LSTMTfidf />} />
        <Route path="/model/lstm-bert" element={<LSTMBert />} />
        <Route path="/model/bert" element={<Bert />} />
      </Routes>

      {/* 🔥 GLOBAL CHATBOT (appears everywhere) */}
      <Chatbot />
    </>
  );
}

export default App;