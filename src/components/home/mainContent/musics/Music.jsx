import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./music.css";
import Heading from "../../../common/heading/Heading";

const Music = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=music&apiKey=16e2256bfb8440d180cd0819e5abeddc"
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <section className="music">
      <Heading title="Music News" />
      <div className="content">
        <Slider {...settings}>
          {articles.map((article, index) => (
            <div key={index} className="items">
              <div className="box shadow flexSB">
                <div className="images">
                  <div className="img">
                    <img src={article.urlToImage} alt={article.title} />
                  </div>
                  <div className="category category1">
                    <span>{article.source.name}</span>
                  </div>
                </div>
                <div className="text">
                  <h1 className="title">{article.title.slice(0, 40)}...</h1>
                  <div className="date">
                    <i className="fas fa-calendar-days"></i>
                    <label>{new Date(article.publishedAt).toLocaleDateString()}</label>
                  </div>
                  <p className="desc">
                    {article.description ? article.description.slice(0, 250) : "No description available"}...
                  </p>
                  <div className="comment">
                    <i className="fas fa-share"></i>
                    <label>Share / </label>
                    <i className="fas fa-comments"></i>
                    <label>Comments</label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Music;
