import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Heading from "../../../common/heading/Heading";
import "../Ppost/ppost.css";

const Life = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=lifestyle&apiKey=16e2256bfb8440d180cd0819e5abeddc"
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
    <section className="popularPost life">
      <Heading title="Life Style" />
      <div className="content">
        <Slider {...settings}>
          {articles.map((article, index) => (
            <div key={index} className="items">
              <div className="box shadow">
                <div className="images">
                  <div className="img">
                    <img src={article.urlToImage} alt={article.title} />
                  </div>
                  <div className="category category1">
                    <span>{article.source.name}</span>
                  </div>
                </div>
                <div className="text">
                  <h1 className="title">{article.title ? article.title.slice(0, 40) + '...' : ''}</h1>
                  <div className="date">
                    <i className="fas fa-calendar-days"></i>
                    <label>{new Date(article.publishedAt).toLocaleDateString()}</label>
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

export default Life;
