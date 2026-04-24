import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>NewsClassifier AI</h2>
      <div style={styles.links}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/" style={styles.link}>Classify</a>
        <a href="/" style={styles.link}>About</a>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    backgroundColor: "#1f2937",
    color: "white"
  },
  logo: {
    margin: 0
  },
  links: {
    display: "flex",
    gap: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none"
  }
};

export default Navbar;