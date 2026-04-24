import React from "react";
import { Link } from "react-router-dom";   // ✅ ADD THIS
import NewsCard from "../components/Newscard";

const Home = () => {

  const staticNews = [
    {
      title: "India wins thrilling cricket match",
      category: "Sports",
      content: "India secured a dramatic victory in the final over of the match."
    },
    {
      title: "Stock markets see strong growth",
      category: "Business",
      content: "Global markets rallied today amid strong investor confidence."
    },
    {
      title: "New AI breakthrough announced",
      category: "Sci/Tech",
      content: "Researchers revealed a new AI model outperforming previous benchmarks."
    }
  ];

  return (
    <div style={styles.container}>
      
      {/* 🔗 ADD BUTTON HERE */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/classifier" style={styles.button}>
          🧠 Go to News Classifier
        </Link>
      </div>

      <h1>Latest News</h1>

      {staticNews.map((news, index) => (
        <NewsCard
          key={index}
          title={news.title}
          category={news.category}
          content={news.content}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "bold"
  }
};

export default Home;