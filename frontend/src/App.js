import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Chatbot from "./components/ChatBot";
import NewsClassifier from "./components/NewsClassifier";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Chatbot />
            </>
          }
        />

        <Route path="/classifier" element={<NewsClassifier />} />
      </Routes>
    </>
  );
}

export default App;