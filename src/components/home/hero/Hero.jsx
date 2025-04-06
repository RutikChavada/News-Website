import React, { useState, useEffect } from "react";
import axios from "axios";
import "./hero.css";
import Card from "./Card";

const Hero = () => {
  const [items, setItems] = useState([]); // State to store fetched articles
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=us&apiKey=16e2256bfb8440d180cd0819e5abeddc"
        );
        setItems(response.data.articles); // Set articles from API
        setLoading(false); // Update loading state
      } catch (error) {
        setError(error); // Set error if fetching fails
        setLoading(false);
      }
    };

    fetchData(); // Call fetch function
  }, []); // Empty dependency array to run the effect only once

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>; // Show error if any
  }

  return (
    <section className="hero">
      <div className="container">
        {items.map((item, index) => (
          <Card
            key={index}
            item={{
              // id: index, // You can use the index as a fallback id (or modify to match your API data)
              cover: item.urlToImage, // API provides urlToImage for image
              // catgeory: item.category || "General", // Category field may need to be adjusted
              title: item.title,
              // authorName: item.author || "Unknown Author", // Handle undefined authors
              // time: item.publishedAt || "Unknown Time", // Published date
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
