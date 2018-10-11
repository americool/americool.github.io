import * as React from 'react';
import { Provider } from 'react-redux';
import FirstComponent from './FirstComponent'
import { configureStore } from './store';

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
          <p className="App-intro">
            In the mean time you can view my resume <a href="https://resume.creddle.io/resume/i4d7un7f8op">here</a>.
          </p>
          <FirstComponent/>
        </div>
      </Provider>
    );
  }
}

export default App;
