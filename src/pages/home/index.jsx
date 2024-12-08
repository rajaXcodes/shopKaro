import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <section className="hero overflow-hidden ">
      <div className="hero-content">
        <h1 className="hero-title">Exclusive Summer Sale!</h1>
        <p className="hero-subtitle">Up to 50% off on all products.</p>
        <button className="hero-btn" onClick={() => navigate("/product-list")}>
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Home;
