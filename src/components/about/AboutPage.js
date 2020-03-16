import React from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => (
  <div className="about">
    <h2>About</h2>
    <p>
      This app is a vending machine. Place your sum, then select a nr,
      and wait for the machine to process your purchase !
    </p>
    <Link to="/machine" className="btn btn-primary">Vending Machine</Link>
  </div>
);

export default AboutPage;
