import React from 'react';
import { DevicesContextProvider } from './context/DevicesContext';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <DevicesContextProvider>
      <Dashboard />
    </DevicesContextProvider>
  );
}

export default App;
