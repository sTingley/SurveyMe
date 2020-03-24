import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
      <div class="message">
        <h1>403 - Unauthorized</h1>
      <p><Link to='/'>Back to Home</Link></p>
    </div>
  )
}

export default Unauthorized;
