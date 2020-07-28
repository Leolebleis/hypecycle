import React from "react";
import ReactMarkdown from "react-markdown";
import markdownFormat from "../utils/markdownFormat";

const Article = (props) => {
  const article = props.article;

  return (
    <>
      <code>{article.title}</code>
      <p>
        <i>{article.createdAt}</i>
      </p>
      <img src={article.image} alt="header for article" />

      <br />
      <ReactMarkdown source={markdownFormat(article.content)} />
    </>
  );
};

export default Article;
