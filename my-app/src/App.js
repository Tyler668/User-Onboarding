import React from 'react';
import './App.css';
import UserForm from "./components/Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className = "appCont">
        <h1>Aggro-Form</h1>
        <UserForm className = "userForm"/>
        </div>
      </header>
    </div>
  );
}

export default App;
