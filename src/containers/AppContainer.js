import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

import Form from '../components/Form';
import Lifts from '../components/Lifts';
import Sidebar from '../components/Sidebar';
import FormError from '../components/FormError';
import LiftError from '../components/LiftError';
import NoPage from '../components/NoPage';

class AppContainer extends Component {
  componentWillMount() {
    const { authStore } = this.props;
    const now = new Date();
    const expirationDate = new Date(localStorage.getItem('expiration-date'));

    if (expirationDate > now) {
      authStore.logMeIn();
    } else {
      localStorage.removeItem('expiration-date');
      localStorage.removeItem('lifter-token');
      localStorage.removeItem('lifter-id');
    }
  }

  render() {
    const { authStore, liftsStore, uiStore } = this.props;

    return (
      <Router>
        <Route
          exact
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="pageChange" timeout={1000}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    render={() =>
                      authStore.state.loggedIn ? (
                        <Fragment>
                          <Sidebar
                            alreadyTaken={liftsStore.state.alreadyTaken}
                            disabled={liftsStore.state.disabled}
                            isActive={uiStore.state.sidebar}
                            toggleSidebar={uiStore.toggleSidebar}
                            onSubmit={e => liftsStore.addNewLift(e)}
                            onChange={e => liftsStore.inputChange(e)}
                            value={liftsStore.state.liftname}
                            logOutClick={() => {
                              authStore.logMeOut();
                              liftsStore.logMeOut();
                            }}
                          />
                          <Lifts
                            getUserLifts={() => liftsStore.getUserLifts()}
                            lifts={liftsStore.state.lifts}
                            removeLift={lift => liftsStore.removeLift(lift)}
                            editWeight={e => liftsStore.editWeight(e)}
                            removing={liftsStore.state.removing}
                          />

                          <Transition
                            mountOnEnter
                            unmountOnExit
                            in={liftsStore.state.error}
                            timeout={300}>
                            {state => {
                              const transitionStyles = {
                                entering: { opacity: 0 },
                                entered: { opacity: 1 },
                                exiting: { opacity: 0 },
                                exited: { opacity: 0 }
                              };

                              return (
                                <LiftError style={{ ...transitionStyles[state] }}>
                                  An error has occurred!
                                </LiftError>
                              );
                            }}
                          </Transition>
                        </Fragment>
                      ) : (
                        <div>
                          <Redirect to={{ pathname: '/login' }} />
                        </div>
                      )
                    }
                  />

                  <Route
                    path="/login"
                    render={() =>
                      !authStore.state.loggedIn ? (
                        <Fragment>
                          <Form
                            email={authStore.state.email}
                            password={authStore.state.password}
                            onChange={e => authStore.inputChange(e)}
                            handleLogin={e => authStore.handleLogin(e)}
                            disabled={authStore.state.disabled}
                          />
                          <Transition
                            mountOnEnter
                            unmountOnExit
                            in={authStore.state.loginError}
                            timeout={300}>
                            {state => {
                              const transitionStyles = {
                                entering: { opacity: 0 },
                                entered: { opacity: 1 },
                                exiting: { opacity: 0 },
                                exited: { opacity: 0 }
                              };

                              return (
                                <FormError style={{ ...transitionStyles[state] }}>
                                  {authStore.state.formErrorMessage}
                                </FormError>
                              );
                            }}
                          </Transition>
                        </Fragment>
                      ) : (
                        <div>
                          <Redirect to={{ pathname: '/' }} />
                        </div>
                      )
                    }
                  />

                  <Route
                    path="/signup"
                    render={() =>
                      !authStore.state.loggedIn ? (
                        <Fragment>
                          <Form
                            signup
                            email={authStore.state.email}
                            password={authStore.state.password}
                            onChange={e => authStore.inputChange(e)}
                            handleSignup={e => authStore.handleSignup(e)}
                            disabled={authStore.state.disabled}
                          />
                          <Transition
                            mountOnEnter
                            unmountOnExit
                            in={authStore.state.signupError}
                            timeout={300}>
                            {state => {
                              const transitionStyles = {
                                entering: { opacity: 0 },
                                entered: { opacity: 1 },
                                exiting: { opacity: 0 },
                                exited: { opacity: 0 }
                              };

                              return (
                                <FormError style={{ ...transitionStyles[state] }}>
                                  {authStore.state.formErrorMessage}
                                </FormError>
                              );
                            }}
                          </Transition>
                        </Fragment>
                      ) : (
                        <div>
                          <Redirect to={{ pathname: '/' }} />
                        </div>
                      )
                    }
                  />

                  <Route component={NoPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    );
  }
}

export default AppContainer;
