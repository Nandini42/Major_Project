import React from "react";

const NBBert = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Naive Bayes + BERT</h1>

      <h2 className="text-xl font-semibold mt-4">Naive Bayes</h2>
      <p>
        Naive Bayes is a simple probabilistic model.
        It assumes independence between features.
        It is efficient and fast.
        It works well on structured features.
        It is commonly used in text classification.
        It performs well on small datasets.
        It is easy to train.
        It requires less computation.
        It is interpretable.
        It is widely used in baseline models.
      </p>

      <h2 className="text-xl font-semibold mt-4">BERT Embeddings</h2>
      <p>
        BERT is a transformer-based model.
        It captures context from both directions.
        It generates contextual embeddings.
        It understands semantic meaning.
        It improves NLP performance.
        It is pre-trained on large data.
        It captures deep language patterns.
        It is powerful but computationally expensive.
        It produces dense vectors.
        It is widely used in modern NLP.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>Good feature representation</li>
        <li>Better than traditional features</li>
        <li>Context-aware embeddings</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>Naive Bayes cannot fully utilize BERT features</li>
        <li>Performance limited</li>
        <li>Computational overhead</li>
      </ul>
    </div>
  );
};

export default NBBert;