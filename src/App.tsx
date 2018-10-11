import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';

import Main from './Main'

import './App.css';

const store = configureStore();

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">This is a Super Boring Placeholder for a Real Portfolio</h1>
          </header>
          <Main/>
        </div>
      </Provider>
    );
  }
}

export default App;
