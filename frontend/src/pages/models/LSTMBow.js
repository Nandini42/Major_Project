import React from "react";

const LSTMBow = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">LSTM + Bag of Words (BoW)</h1>

      <h2 className="text-xl font-semibold mt-4">LSTM</h2>
      <p>
        LSTM is a type of Recurrent Neural Network used for sequential data.
        It is designed to capture long-term dependencies in text.
        It uses memory cells to retain information.
        It has three main gates: input, forget, and output gates.
        It processes data in sequence order.
        It is widely used in NLP tasks like text classification.
        It overcomes vanishing gradient problem.
        It can learn context across time steps.
        It requires more computation than traditional models.
        It performs better than basic ML models in sequence tasks.
      </p>

      <h2 className="text-xl font-semibold mt-4">Bag of Words (BoW)</h2>
      <p>
        BoW converts text into numerical vectors based on word frequency.
        It ignores word order and grammar.
        It treats each word independently.
        It creates a vocabulary from dataset.
        It produces sparse feature vectors.
        It is simple and fast.
        It is widely used in traditional NLP tasks.
        It does not capture context or semantics.
        It is easy to implement.
        It is useful for baseline models.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>LSTM can capture sequential patterns</li>
        <li>Better than Naive Bayes in sequence modeling</li>
        <li>Works reasonably well on moderate datasets</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>BoW lacks context → limits LSTM capability</li>
        <li>Word order is ignored</li>
        <li>LSTM cannot fully utilize its power</li>
        <li>Lower accuracy compared to TF-IDF and BERT</li>
      </ul>
    </div>
  );
};

export default LSTMBow;