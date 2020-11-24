import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return(
    <div>
      <h1>IronResto</h1>
      <Link to="/signup">
        <p>Sign up</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
    </div>
  )
}

export default HomePage;