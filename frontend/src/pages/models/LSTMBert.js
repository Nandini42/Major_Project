import React from "react";

const LSTMBert = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">LSTM + BERT Embeddings</h1>

      <h2 className="text-xl font-semibold mt-4">LSTM</h2>
      <p>
        LSTM is a deep learning model for sequential data.
        It captures long-term dependencies in text.
        It uses memory cells to retain information.
        It has input, forget, and output gates.
        It processes sequences step by step.
        It is widely used in NLP tasks.
        It improves over traditional ML models.
        It can model temporal relationships.
        It requires more training time.
        It performs well with meaningful input features.
      </p>

      <h2 className="text-xl font-semibold mt-4">BERT Embeddings</h2>
      <p>
        BERT generates contextual embeddings for text.
        It understands meaning based on surrounding words.
        It processes text in both directions.
        It captures semantic relationships.
        It is pre-trained on large datasets.
        It produces dense feature vectors.
        It improves performance in NLP tasks.
        It handles ambiguity in language.
        It is computationally expensive.
        It is state-of-the-art feature extractor.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>Combines sequence learning + contextual understanding</li>
        <li>Better performance than BoW/TF-IDF combinations</li>
        <li>Captures deep semantic meaning</li>
        <li>More powerful hybrid architecture</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>High computational cost</li>
        <li>Long training time</li>
        <li>Complex architecture</li>
        <li>Still slightly below fine-tuned BERT performance</li>
      </ul>
    </div>
  );
};

export default LSTMBert;