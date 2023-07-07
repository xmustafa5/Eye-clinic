import React from "react";
import { Button,Form } from "react-bootstrap";
import { Link } from "react-router-dom";
const Login = () => {
  return (

    <>      
             <div className='d-flex align-items-center justify-content-center ' style={{minHeight:"100vh"}}>

<div className='w-100' style={{maxWidth:"400px"}}>

<h2 className="text-center mb-4">Log In</h2>
          <Form >
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email"  />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
            
              />
            </Form.Group>
            <Button  className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
</div>
</div>
    </>
  );
};

export default Login;
