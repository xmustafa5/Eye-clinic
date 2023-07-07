import React from 'react'
import { useRef } from 'react';
        import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
const Singup = () => {
    const {signup} = useAuth()
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef(); 
    async function handleSubmit(e) {

    }

  return (
    <>
         <div className='d-flex align-items-center justify-content-center ' style={{minHeight:"100vh"}}>

<div className='w-100' style={{maxWidth:"400px"}}>

          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSubmit}>
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
            <Form.Group>
              <Form.Label htmlFor="password-confirm">
                Password Confirmation
              </Form.Label>
              <Form.Control
                id="password-confirm"
                type="password"
              />
            </Form.Group>
            <Button  className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
         
      
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div> </div>
          </div>
    </>
  )
}

export default Singup