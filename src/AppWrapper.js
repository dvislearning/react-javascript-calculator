import React from 'react';
import { Provider } from 'react-redux';
import { Container, store } from './App'

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};

export default AppWrapper;