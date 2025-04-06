import React, { useState, useEffect } from "react";
import "./Popular.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Heading from "../../../common/heading/Heading";

const Popular = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=bitcoin&apiKey=16e2256bfb8440d180cd0819e5abeddc"
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
    <section className="popular">
      <Heading title="Popular" />
      <div className="content">
        <Slider {...settings}>
          {articles.map((article, index) => (
            <div key={index} className="items">
              <div className="box shadow">
                <div className="images row">
                  <div className="img">
                    <img src={article.urlToImage} alt={article.title} />
                  </div>
                  <div className="category category1">
                    <span>{article.source.name}</span>
                  </div>
                </div>
                <div className="text row">
                  <h1 className="title">{article.title.slice(0, 40)}...</h1>
                  <div className="date">
                    <i className="fas fa-calendar-days"></i>
                    <label>{new Date(article.publishedAt).toLocaleDateString()}</label>
                  </div>
                  <div className="comment">
                    <i className="fas fa-comments"></i>
                    <label>0</label> {/* No comment data available in API */}
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

export default Popular;
