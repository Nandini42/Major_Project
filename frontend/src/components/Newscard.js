import React from "react";

const NewsCard = ({ title, category, content }) => {
  return (
    <div style={styles.card}>
      <span style={styles.category}>{category}</span>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    marginBottom: "20px"
  },
  category: {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#4CAF50"
  }
};

export default NewsCard;