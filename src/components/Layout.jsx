import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  .modal-90w {
    width: 80%;
    max-width: 90%;
    min-height: 100%;

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

`;

const Styles = styled.div`
  a {
    text-decoration: none;
    color: #ffffff;
  }

  hr {
    background-color: grey;
  }
`;

const Layout = (props) => {
  return (
    <>
      <Global />
      <Styles>{props.children}</Styles>
    </>
  );
};

export default Layout;
