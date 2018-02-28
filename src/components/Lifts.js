import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import SingleLift from './SingleLift';

const ContentArea = styled.div`
  width: 100%;
  min-height: 100%;
  align-items: center;
  display: flex;
  padding-left: 0;
  transition: all 0.25s ease-in-out;

  .liftsList {
    width: 100%;
    max-width: 980px;
    height: 100%;
    display: flex;
    margin: 0px auto;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 0 20px;
    transition: all 0.25s ease-in-out;
  }

  @media (min-width: 650px) {
    padding-left: 320px;

    .liftsList {
      padding: 0 20px;
    }
  }

  @media (min-width: 800px) {
    .liftsList {
      padding: 0 50px;
    }
  }
`;

const Remover = styled.button`
  background: none;
  border: none;
  color: #28222c;
  cursor: pointer;
  font-size: 12px;
  text-transform: uppercase;
  position: absolute;
  top: 5px;
  right: 5px;

  &:hover {
    transform: translateX(5px);
  }
`;

const LiftName = styled.div`
  height: 90px;
  text-align: center;

  input {
    width: 100%;
    background: none;
    border: none;
    font-family: 'Cousine';
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    position: relative;
    z-index: 2;
  }

  h2 {
    font-family: 'Kanit';
    font-size: 40px;
    font-weight: 900;
    font-style: italic;
    line-height: 30px;
    margin: 0;
    text-transform: uppercase;
    position: relative;
    word-break: break-word;
    z-index: 1;
  }
`;

let activeLift;

class Lifts extends Component {
  componentDidMount() {
    this.props.getUserLifts();
  }

  checkLift = lift => {
    activeLift = lift;
  };

  render() {
    const { lifts, removing } = this.props;
    return (
      <ContentArea>
        <TransitionGroup className="liftsList">
          {Object.keys(lifts).map(key => {
            const lift = key;
            const weight = lifts[key];
            return (
              <SingleLift
                className={activeLift === lift && removing && 'removing'}
                lifts={weight}
                key={lift}>
                <Remover
                  disabled={removing}
                  onClick={() => {
                    this.props.removeLift(lift);
                    this.checkLift(lift);
                  }}
                  type="button">
                  Remove
                </Remover>
                <LiftName>
                  <input
                    onKeyUp={e => this.props.editWeight(e)}
                    onChange={e => this.props.editWeight(e)}
                    type="text"
                    name={lift}
                    value={weight}
                  />
                  <h2>{lift}</h2>
                </LiftName>
              </SingleLift>
            );
          })}
        </TransitionGroup>
      </ContentArea>
    );
  }
}

export default Lifts;
