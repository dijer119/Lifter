import React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.div`
  width: 100%;
  background: #df4e4e;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 10px 0;
  transition: all 300ms ease-in-out;
  position: absolute;
  right: 0;
  top: 0;

  @media (min-width: 650px) {
    width: calc(100% - 320px);
  }
`;

const LiftError = props => {
  return <ErrorMessage {...props}>{props.children}</ErrorMessage>;
};

export default LiftError;
