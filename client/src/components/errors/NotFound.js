import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({location}) => (
  <div>
    <h1>404 - Not Found!</h1>
    <h2>No match found for <code>{location.pathname}</code></h2>
    <Link to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;