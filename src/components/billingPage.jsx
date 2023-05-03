import React from 'react';
import '../assets/css/billingPage.css';

export default function BillingPage(props) {
  const totalTicketPrice = props.ticketPrice ? props.ticketPrice * props.numTickets : 0;

  const handlePayClick = () => {
    // Implement payment logic here
  };

  return (
    <div className="billingPage">
      <h1>Summary</h1>
      <div className="summaryBox">
        <div className="item">
          <span className="label">Ticket Price:</span>
          <span className="value">${props.ticketPrice ? props.ticketPrice.toFixed(2) : 0}</span>
        </div>
        <div className="item">
          <span className="label">Number of Tickets:</span>
          <span className="value">{props.numTickets}</span>
        </div>
        <div className="item">
          <span className="label">Total Price:</span>
          <span className="value">${totalTicketPrice.toFixed(2)}</span>
        </div>
      </div>
      <button className="payButton" onClick={handlePayClick}>Pay Now</button>
    </div>
  );
}
