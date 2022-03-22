import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ChildMessageBridge } from './ChildMessageBridge';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Child Bridge Iframe
      </header>
      <ChildMessageBridge />
    </div>
  );
}

export default App;
