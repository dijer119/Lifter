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
`;

function buildError(error) {
  switch (error) {
    case 'EMAIL_NOT_FOUND':
      return 'E-mail not found, brow!';

    case 'INVALID_PASSWORD':
      return 'Wrong password, ma friend!';

    case 'USER_DISABLED':
      return 'You have been removed, my bad!';

    case 'EMAIL_EXISTS':
      return 'You already have an account, fool!';

    case 'WEAK_PASSWORD : Password should be at least 6 characters':
      return 'Weak password, just like you!';

    default:
      return 'Something bad happened!';
  }
}

const FormError = props => {
  return <ErrorMessage {...props}>{buildError(props.children)}</ErrorMessage>;
};

export default FormError;
