import React from "react";
import ArticlePreview from "./ArticlePreview";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <>
      {props.articles.map((article) => (
        <Link to={`${article.path}`} key={article.title}>
          <ArticlePreview article={article} />
        </Link>
      ))}
    </>
  );
};

export default Home;
