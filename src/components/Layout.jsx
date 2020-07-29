import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    .modal-90w {
    width: 95%;
    max-width: 100%;
  }

`;

const Styles = styled.div`
  a {
    text-decoration: none;
    color: #ffffff;
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
