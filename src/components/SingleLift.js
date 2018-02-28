import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const TheLift = styled.div`
  width: 90%;
  max-width: 250px;
  background: #f4ff3f;
  margin: 20px;
  padding: 20px;
  position: relative;
  transition: all 0.25s ease-in-out;

  &.removing {
    opacity: 0.5;
    transform: scale(0.8);
  }

  &.liftAnimation-enter {
    opacity: 0;
    transform: scale(0.1);
  }

  &.liftAnimation-enter.liftAnimation-enter-active {
    opacity: 1;
    transform: scale(1);
  }

  &.liftAnimation-exit {
    opacity: 1;
    transform: scale(1);
  }

  &.liftAnimation-exit.liftAnimation-exit-active {
    opacity: 0;
    transform: scale(0.1);
  }

  .porcentagens {
    font-family: 'Cousine';
    font-size: 18px;
    margin-top: 15px;
  }

  .porcentagem {
    border-bottom: 1px dotted #000000;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    position: relative;

    &:before {
      content: '';
      width: 100%;
      height: 1px;
      background: #e1ec3d;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:last-of-type {
      border: none;
      padding-bottom: 0;
    }
  }

  .porcento,
  .resultado {
    background: #f4ff3f;
    position: relative;
    z-index: 2;
  }

  .porcento {
    padding-right: 10px;
  }

  .resultado {
    font-weight: 700;
    padding-left: 10px;
  }
`;

const porcentagens = [70, 80, 85, 90, 95, 100];

class SingleLift extends React.Component {
  handlePercent = n => {
    const percentage = parseFloat(n) / 100;
    const total = parseFloat(this.props.lifts);
    return Math.ceil(total * percentage);
  };

  render() {
    return (
      <CSSTransition {...this.props} classNames="liftAnimation" timeout={250}>
        <TheLift>
          {this.props.children}
          <div className="porcentagens">
            {porcentagens.map(prc => {
              const index = porcentagens.indexOf(prc);
              const calculatedPercentage = this.handlePercent(prc);

              return (
                <div className="porcentagem" key={index}>
                  <span className="porcento">{prc}% </span>
                  <span className="resultado">{calculatedPercentage}kg</span>
                </div>
              );
            })}
          </div>
        </TheLift>
      </CSSTransition>
    );
  }
}

export default SingleLift;
