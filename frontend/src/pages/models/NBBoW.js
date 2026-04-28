import React from "react";

const NBBoW = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Naive Bayes + BoW</h1>

      <h2 className="text-xl font-semibold mt-4">Naive Bayes</h2>
      <p>
        Naive Bayes is a probabilistic classifier based on Bayes theorem.
        It assumes independence between features in the dataset.
        It is widely used in text classification tasks.
        It performs well on small datasets.
        It is computationally efficient and fast.
        It works well with high-dimensional data.
        It is easy to implement and interpret.
        It provides good baseline performance.
        It handles categorical data effectively.
        It is commonly used in spam detection and news classification.
      </p>

      <h2 className="text-xl font-semibold mt-4">Bag of Words (BoW)</h2>
      <p>
        BoW converts text into numerical form using word frequency.
        It ignores grammar and word order.
        Each document is represented as a vector.
        Vocabulary is created from all words in dataset.
        Each word is treated independently.
        It is simple and easy to implement.
        It works well for basic NLP tasks.
        It does not capture context or semantics.
        It results in sparse vectors.
        It is widely used in traditional ML models.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>Very fast and efficient</li>
        <li>Easy to implement</li>
        <li>Works well for small datasets</li>
        <li>Good baseline model</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>Lacks context understanding</li>
        <li>Assumes feature independence</li>
        <li>Lower accuracy compared to deep models</li>
        <li>Cannot capture semantic meaning</li>
      </ul>
    </div>
  );
};

export default NBBoW;