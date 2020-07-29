import React from "react";
import ArticlePreview from "./ArticlePreview";

const Home = (props) => {
  return (
    <>
      {props.articles.map((article) => (
        <ArticlePreview article={article} key={article.path} />
      ))}
    </>
  );
};

export default Home;
