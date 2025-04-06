import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import Heading from "../../../common/heading/Heading";
import "./ppost.css";

const Ppost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=apple&apiKey=16e2256bfb8440d180cd0819e5abeddc"
        );
        setPosts(response.data.articles);
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
    <section className="popularPost">
      <Heading title="Popular Posts" />
      <div className="content">
        <Slider {...settings}>
          {posts.map((post, index) => (
            <div key={index} className="items">
              <div className="box shadow">
                <div className="images">
                  <div className="img">
                    <img src={post.urlToImage} alt={post.title} />
                    <div className="overlay">
                      <h2>{post.title}</h2>
                    </div>
                  </div>
                  <div className="category category1">
                    <span>{post.source.name}</span>
                  </div>
                </div>
                <div className="text">
                  <h1 className="title">{post.title.slice(0, 40)}...</h1>
                  <div className="date">
                    <i className="fas fa-calendar-days"></i>
                    <label>{new Date(post.publishedAt).toLocaleDateString()}</label>
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

export default Ppost;
