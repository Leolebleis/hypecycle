import MarkdownEditor from "@uiw/react-markdown-editor";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../utils/api";

export default () => {
  let [article, setArticle] = useState();

  let handleChange = (editor, data, value) => {
    setArticle(value);
  };

  const submitArticle = async (event) => {
    event.preventDefault();
    console.log("event", event.target.title.value);
    console.log("article", article);

    await api
      .createArticle({
        title: event.target.title.value,
        description: event.target.description.value,
        image: event.target.picture.value,
        content: article,
        path: event.target.path.value,
        createdAt: new Date(Date.now()).toLocaleDateString("en-GB"),
        updatedAt: new Date(Date.now()).toLocaleDateString("en-GB"),
        hashtags: event.target.hashtags.value.split(";"),
      })
      .then((response) => {
        console.log("response", response);
      });
  };

  return (
    <>
      <Modal.Header>Add an article</Modal.Header>
      <Modal.Body>
        <MarkdownEditor onChange={handleChange} />

        <Form onSubmit={(event) => submitArticle(event)}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter the title" />
          </Form.Group>
          <Form.Group controlId="path">
            <Form.Label>Path</Form.Label>
            <Form.Control type="text" placeholder="Enter the path" />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeHolder="Enter a description" />
          </Form.Group>
          <Form.Group controlId="hashtags">
            <Form.Label>Hashtags</Form.Label>
            <Form.Control type="text" placeHolder="Hashtags separated by ;" />
          </Form.Group>
          <Form.Group controlId="picture">
            <Form.Label>Picture</Form.Label>
            <Form.Control type="text" placeHolder="Enter picture URL" />
          </Form.Group>

          <Button type="submit">Send</Button>
        </Form>
      </Modal.Body>
    </>
  );
};
