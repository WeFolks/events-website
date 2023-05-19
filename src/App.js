import React from 'react';
import './App.css';
import Header from "./components/header";
import EventsBox from "./components/eventsBox";
import 'font-awesome/css/font-awesome.min.css';
import {Route, Routes} from "react-router-dom";
import LandingPage from './components/landingPage';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route exact path="/" element={ <LandingPage/> } />
            <Route exact path="/:id" element={ <EventsBox/> } />
        </Routes>
    </div>
  );
}

export default App;
