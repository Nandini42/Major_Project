import React from "react";

const LSTMTfidf = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">LSTM + TF-IDF</h1>

      <h2 className="text-xl font-semibold mt-4">LSTM</h2>
      <p>
        LSTM is a type of recurrent neural network.
        It handles sequential data effectively.
        It captures long-term dependencies.
        It has memory cells.
        It uses input, forget, and output gates.
        It is used in NLP tasks.
        It learns context over sequences.
        It is more powerful than traditional ML.
        It requires more data.
        It is computationally expensive.
      </p>

      <h2 className="text-xl font-semibold mt-4">TF-IDF</h2>
      <p>
        TF-IDF highlights important words.
        It reduces noise from common words.
        It improves feature quality.
        It assigns weights to words.
        It enhances model performance.
        It works better than BoW.
        It is widely used.
        It creates numerical vectors.
        It is simple to compute.
        It improves classification.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>High accuracy (~85%)</li>
        <li>Better than BoW + LSTM</li>
        <li>Captures sequence + importance</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>Still limited context</li>
        <li>Training cost higher</li>
        <li>Not as good as BERT</li>
      </ul>
    </div>
  );
};

export default LSTMTfidf;