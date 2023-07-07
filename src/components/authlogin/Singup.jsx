import React from 'react'
        import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';
const Singup = () => {
    async function handleSubmit(e) {

    }
  return (
    <>
       
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
      </div>
    </>
  )
}

export default Singup