import React from 'react';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';

const TheSidebar = styled.div`
  width: 85%;
  max-width: 320px;
  height: 100%;
  align-items: center;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  transition: all 0.5s ease-in-out;
  transform: translateX(-100%);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;

  &.active {
    transform: translateX(0);
  }

  @media (min-width: 650px) {
    transform: unset;

    &.active {
      transform: unset;
    }
  }

  @media (min-width: 800px) {
    width: 320px;

    &.pageChange-enter {
      opacity: 0;
      transform: translateX(-100%);
    }

    &.pageChange-enter.pageChange-enter-active {
      opacity: 1;
      transform: translate(0);
    }

    &.pageChange-exit {
      opacity: 1;
      transform: translate(0);
    }

    &.pageChange-exit.pageChange-exit-active {
      opacity: 0;
      transform: translateX(-100%);
    }
  }

  .theForm {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    position: relative;
  }

  form {
    width: 100%;
    padding: 0 10%;
  }

  p {
    font-size: 16px;
    line-height: 20px;
  }

  input {
    width: calc(100% - 35px);
    background: none;
    border: none;
    border-bottom: 3px solid #28222c;
    color: #28222c;
    padding: 8px 0;
  }
`;

const Logo = styled.div`
  width: 70%;
  height: auto;
  position: absolute;
  top: 70px;

  svg {
    width: 100%;
  }
`;

const Adicionar = styled.button`
  width: 25px;
  height: 25px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;

  &:before,
  &:after {
    transition: all 0.25s ease-in-out;
  }

  &:before {
    content: '';
    width: 100%;
    height: 3px;
    background: #28222c;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }

  &:after {
    content: '';
    width: 3px;
    height: 100%;
    background: #28222c;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  &:hover {
    &:before {
      transform: translateY(-50%) rotate(-90deg);
    }
    &:after {
      transform: translateX(-50%) rotate(-90deg);
    }
  }
`;

const LogOutBtn = styled.button`
  background: none;
  border: none;
  display: inline-block;
  color: #28222c;
  position: absolute;
  bottom: 20px;

  &:before {
    content: '';
    width: 100%;
    height: 1px;
    background: #28222c;
    position: absolute;
    left: 0;
    bottom: -20px;
    transition: all 0.25s ease-in-out;
    opacity: 0;
    visibility: hidden;
  }

  &:hover {
    &:before {
      bottom: -4px;
      opacity: 1;
      visibility: visible;
    }
  }
`;

const OpenButton = styled.button`
  width: 20px;
  height: 13px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: -32px;
  top: 12px;

  svg {
    width: 100%;
  }

  @media (min-width: 650px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  width: 18px;
  height: 19px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 10px;
  top: 10px;

  svg {
    width: 100%;
  }

  @media (min-width: 650px) {
    display: none;
  }
`;

const LiftTaken = styled.div`
  width: 100%;
  color: #df4e4e;
  text-align: center;
  position: absolute;
  bottom: -30px;
  left: 0;
  transition: all 0.25s ease-in-out;
`;

const Sidebar = props => (
  <TheSidebar className={props.isActive && 'active'}>
    <Logo>
      <svg viewBox="0 0 242 41" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M29.66685.13584l-4.31347 40.8041h24.54047l1.34073-12.53311h-9.6764l2.97274-28.271zm29.20345 0l-4.31346 40.8041H69.4209L73.73437.13584zm21.27594 0l-4.31388 40.8041h14.86448l1.10747-10.55102h12.76556l1.1663-11.3084H92.9702l.6829-6.41198h24.32408l-2.97355 28.2714h14.8649l2.97272-28.2714h7.51946l1.34074-12.5327zm66.21779 0l-4.31347 40.8041h27.63004l1.10706-10.66744h-12.76555l.4661-4.54632h12.76638l1.10706-10.0849H159.5961l.46611-4.838h12.76596l1.1659-10.66744zm54.26844 17.10856c-.23326.60269-.56402 1.13667-.99104 1.60278-.42785.46652-.93263.83637-1.51558 1.10748-.58294.27234-1.2239.40851-1.92368.40851h-3.55567l.93263-9.09345h3.6141c1.20373 0 2.13677.39864 2.79788 1.19469.66029.79687.99105 1.7587.99105 2.88551 0 .66111-.11684 1.2926-.34968 1.89447m13.3777 5.50857c1.49542-2.56504 2.24457-5.36293 2.24457-8.39408 0-1.9426-.3209-3.77866-.96225-5.50857-.64137-1.72867-1.57358-3.2352-2.7979-4.51751-1.2243-1.28232-2.72054-2.30216-4.4883-3.06036-1.769-.75779-3.76014-1.13627-5.97509-1.13627h-22.09226l-4.31346 40.80369h14.86407l.99105-9.50156 5.71261 9.50156h17.60396l-6.93693-12.00818c2.6029-1.55383 4.6537-3.6141 6.14993-6.17872M22.0313 14.6756H.75606v11.72473h20.0357zm198.6036 11.72473h21.27523V14.67561h-20.0357z"
          fill="#27232C"
        />
      </svg>
    </Logo>
    <form onSubmit={e => props.onSubmit(e)}>
      <p>Feeling strong? Use the field below to add a new lift, ma friend!</p>
      <div className="theForm">
        <input
          onChange={e => props.onChange(e)}
          value={props.value}
          type="text"
          name="lift"
          placeholder="Lift name..."
          disabled={props.disabled}
        />
        <Adicionar type="submit" disabled={props.disabled} />
        <Transition mountOnEnter unmountOnExit in={props.alreadyTaken} timeout={300}>
          {state => {
            const transitionStyles = {
              entering: { opacity: 0, bottom: 0 },
              entered: { opacity: 1, bottom: -30 },
              exiting: { opacity: 0 },
              exited: { opacity: 0 }
            };

            return (
              <LiftTaken style={{ ...transitionStyles[state] }}>That lift alreay exists!</LiftTaken>
            );
          }}
        </Transition>
      </div>
    </form>

    <LogOutBtn onClick={() => props.logOutClick()} type="button">
      Hi, <strong>{localStorage.getItem('email')}</strong>! Logout?
    </LogOutBtn>

    {props.isActive && (
      <CloseButton onClick={() => props.toggleSidebar()}>
        <svg viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
          <g fill="#27232C">
            <rect transform="rotate(45 9 9.5)" x="-2" y="8" width="22" height="3" rx=".5" />
            <rect
              transform="scale(-1 1) rotate(45 0 -12.22792)"
              x="-2"
              y="8"
              width="22"
              height="3"
              rx=".5"
            />
          </g>
        </svg>
      </CloseButton>
    )}

    {!props.isActive && (
      <OpenButton onClick={() => props.toggleSidebar()}>
        <svg viewBox="0 0 25 17" xmlns="http://www.w3.org/2000/svg">
          <g fill="#FFF">
            <rect width="19" height="3" rx=".5" />
            <rect y="7" width="22" height="3" rx=".5" />
            <rect y="14" width="25" height="3" rx=".5" />
          </g>
        </svg>
      </OpenButton>
    )}
  </TheSidebar>
);

export default Sidebar;
