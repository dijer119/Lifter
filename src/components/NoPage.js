import React from 'react';
import styled from 'styled-components';

import img from '../images/muscle.gif';

const Error404 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: url(${img}) no-repeat center bottom;

  h1 {
    color: white;
    font-size: 40px;
    padding: 0 20px;
  }
`;

const NoPage = props => {
  return (
    <Error404>
      <h1>There is nothing here!</h1>
    </Error404>
  );
};

export default NoPage;
