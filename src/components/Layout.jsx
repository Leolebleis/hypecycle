import React from "react";
import styled from "styled-components"

const Styles = styled.div`
  .a {
    &:hover {
      color: #ffffff
    }
  }
`

const Layout = (props) => {
  return (
    <Styles>
      {props.children}
    </Styles>
  )
}
