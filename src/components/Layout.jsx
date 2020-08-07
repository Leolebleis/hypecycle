import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  .modal-90w {
    width: 80%;
    max-width: 90%;
    min-height: 100%;
  }

  html, body { 
    height: 100%;
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex: 1;
  }

  .btn {
    background-color: transparent;
    border-color: rgb(214, 78, 138);

    &:hover {
      background-color: rgb(214, 78, 138);
    }

    &:active {
      background-color: rgb(214, 78, 138);
    }
  }

  .form-control {
    border-color: rgb(214, 78, 138);
  }

  .form-control::-webkit-input-placeholder {
    color: darkgray;
    &:focus {
      color: darkgray;

    }
  }

  .modal-content {
    background-color: rgb(43, 46, 47);
    color: white;
  }

  .modal-header {
    border-bottom: 1px solid rgb(214, 78, 138);
  }

  hr {
    background-color: grey;
  }

`;

const Styles = styled.div`
  a {
    text-decoration: none;
    color: #ffffff;
  }

`;

const Layout = (props) => {
  return (
    <main>
      <Global />
      <Styles>{props.children}</Styles>
    </main>
  );
};

export default Layout;
