import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ParentMessageBridge } from './ParentMessageBridge';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Wix TPA Container App
      </header>
      <ParentMessageBridge />
    </div>
  );
}

export default App;
