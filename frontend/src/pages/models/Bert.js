import React from "react";

const Bert = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Fine-Tuned BERT</h1>

      <p>
        Fine-tuned BERT is a transformer-based model.
        It is pre-trained on large datasets.
        It is fine-tuned for specific tasks.
        It captures deep contextual meaning.
        It understands semantics.
        It performs best in NLP tasks.
        It updates all weights during training.
        It provides high accuracy.
        It is widely used in industry.
        It is state-of-the-art model.
      </p>

      <h2 className="text-xl font-semibold mt-4">Pros</h2>
      <ul className="list-disc ml-6">
        <li>Highest accuracy (~87%)</li>
        <li>Deep contextual understanding</li>
        <li>Best performance</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">Cons</h2>
      <ul className="list-disc ml-6">
        <li>High computational cost</li>
        <li>Slow training</li>
        <li>Requires GPU</li>
      </ul>
    </div>
  );
};

export default Bert;