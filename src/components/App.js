import React, { Component } from 'react';
import { Subscribe, Provider } from 'unstated';

import AppContainer from '../containers/AppContainer';
import AuthContainer from '../containers/AuthContainer';
import LiftsContainer from '../containers/LiftsContainer';
import UIContainer from '../containers/UIContainer';

class App extends Component {
  render() {
    return (
      <Provider>
        <Subscribe to={[AuthContainer, LiftsContainer, UIContainer]}>
          {(authStore, liftsStore, uiStore) => (
            <AppContainer authStore={authStore} liftsStore={liftsStore} uiStore={uiStore} />
          )}
        </Subscribe>
      </Provider>
    );
  }
}

export default App;
