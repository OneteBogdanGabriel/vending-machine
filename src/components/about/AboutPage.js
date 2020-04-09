import React from 'react';
import { Link } from 'react-router-dom';
import { aboutText, aboutHeader, aboutVendingMachineBtn } from '../../server/public/other/texts';
import './AboutPage.css';


const AboutPage = () => {
  // eslint-disable-next-line react/no-array-index-key
  const newText = aboutText.split('\n').map((item, i) => <p key={i} className="aboutText">{item}</p>);
  return (
    <div className="about">
      <h2>{aboutHeader}</h2>
      {newText}
      <Link to="/machine" className="btn btn-primary">{aboutVendingMachineBtn}</Link>
    </div>
  );
};

export default AboutPage;

// const AboutPage = () => {
//   const text = 'This app is a vending machine. Place your sum, then select a nr, \n and wait for the machine to process your purchase !';
//   // eslint-disable-next-line react/no-array-index-key
//   const newText = text.split('\n').map((item, i) => <p key={i}>{item}</p>);
//   return (
//     <div className="about">
//       <h2>About</h2>
//       <p className="aboutText">
//         {newText}
//       </p>
//       <Link to="/machine" className="btn btn-primary">Vending Machine</Link>
//     </div>
//   );
// };

// export default AboutPage;
