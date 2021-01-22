import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';


export default function Home() {
  return (
    <div>
      <Button variant="success">Success</Button> <h1>home</h1>
      <Link to="/login"><Button variant="success">Login</Button></Link>
      <Link to="/register"><Button variant="success">Register</Button></Link>
      
    </div>
  );
}
