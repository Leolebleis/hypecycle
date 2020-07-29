import React from "react";
import styled from "styled-components";

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
  return <Styles>{props.children}</Styles>;
};

export default Layout;
