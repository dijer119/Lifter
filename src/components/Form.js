import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  10%, 90% {
    transform: translate3d(0, -1px, 0);
  }

  20%, 80% {
    transform: translate3d(0, 2px, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(0, -4px, 0);
  }

  40%, 60% {
    transform: translate3d(0, 4px, 0);
  }
`;

const Formulario = styled.form`
  width: 80%;
  max-width: 300px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease-in-out;

  &.pageChange-enter {
    opacity: 0;
    transform: translate(-50%, calc(-50% - 300px));
    z-index: 2;
  }

  &.pageChange-enter.pageChange-enter-active {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  &.pageChange-exit {
    opacity: 1;
    transform: translate(-50%, -50%);
  }

  &.pageChange-exit.pageChange-exit-active {
    opacity: 0;
    transform: translate(-50%, calc(-50% + 300px));
  }

  a {
    color: #fff356;
    display: inline-block;
    font-size: 18px;
    margin-top: 25px;
    text-decoration: none;
    position: relative;

    &:before {
      content: '';
      width: 100%;
      height: 1px;
      background: #fff356;
      position: absolute;
      left: 0;
      bottom: -20px;
      transition: all 0.25s ease-in-out;
      opacity: 0;
      visibility: hidden;
    }

    &:hover {
      &:before {
        bottom: -8px;
        opacity: 1;
        visibility: visible;
      }
    }
  }
`;

const Input = styled.input`
  width: 100%;
  background: none;
  border: none;
  border-bottom: 3px solid white;
  color: white;
  font-size: 24px;
  margin-bottom: 15px;
  padding: 8px 0;

  &:-webkit-autofill {
    box-shadow: 0 0 0 50px #ffffff inset;
  }

  &::placeholder {
    color: #bebcbf;
  }
`;

const Botao = styled.button`
  width: 100%;
  height: 50px;
  align-items: center;
  background-color: #fff356;
  border: none;
  color: #28222c;
  display: flex;
  font-size: 24px;
  font-weight: 600;
  justify-content: center;
  line-height: 24px;
  margin: 10px 0 0 0;
  text-align: center;
  text-transform: uppercase;
  padding: 0;

  &:hover {
    animation: ${shake} 0.25s infinite;
  }

  &[disabled] {
    &:hover {
      animation: none;
    }
  }
`;

const Form = props => {
  const { signup, email, password, disabled } = props;
  const inputEmail = (
    <Input
      value={email}
      type="text"
      name="email"
      placeholder="E-mail"
      disabled={disabled}
      onChange={e => props.onChange(e)}
    />
  );
  const inputPassword = (
    <Input
      value={password}
      type="password"
      name="password"
      placeholder="Password"
      disabled={disabled}
      onChange={e => props.onChange(e)}
    />
  );

  return signup ? (
    <Formulario onSubmit={e => props.handleSignup(e)}>
      {inputEmail}
      {inputPassword}
      <Botao disabled={disabled} type="submit">
        Signup
      </Botao>
      <Link className={disabled ? 'disabled-link' : ''} to={'/login'}>
        Hey, I have an account!
      </Link>
    </Formulario>
  ) : (
    <Formulario onSubmit={e => props.handleLogin(e)}>
      {inputEmail}
      {inputPassword}
      <Botao disabled={disabled} type="submit">
        Come on!
      </Botao>
      <Link className={disabled ? 'disabled-link' : ''} to={'/signup'}>
        Geez, I gotta signup first!
      </Link>
    </Formulario>
  );
};

export default Form;
