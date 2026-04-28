import React from "react";

const NBTfidf = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Naive Bayes + TF-IDF</h1>

      <h2 className="text-xl font-semibold mt-4">Naive Bayes</h2>
      <p>
        Naive Bayes is a probabilistic classification algorithm.
        It uses Bayes theorem to predict probabilities.
        It assumes independence between features.
        It works well for text classification tasks.
        It is fast and efficient.
        It handles high-dimensional data easily.
        It requires less training data.
        It is simple to implement.
        It provides good baseline performance.
        It is widely used in NLP applications.
      </p>

      <h2 className="text-xl font-semibold mt-4">TF-IDF</h2>
      <p>
        TF-IDF measures importance of words in documents.
        It combines term frequency and inverse document frequency.
        It reduces importance of common words.
        It highlights rare but important words.
        It improves feature quality over BoW.
        It helps in better classification performance.
        It produces weighted vectors.
        It reduces noise in data.
        It is widely used in text mining.
        It improves model accuracy.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>Better than BoW</li>
        <li>Highlights important words</li>
        <li>Improves accuracy</li>
        <li>Efficient and scalable</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>Still lacks context</li>
        <li>Limited semantic understanding</li>
        <li>Independent features assumption</li>
        <li>Not suitable for complex tasks</li>
      </ul>
    </div>
  );
};

export default NBTfidf;