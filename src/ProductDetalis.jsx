import React from "react";
import { Button, FloatingLabel } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ProductDetails = ({
  handlePopupToggle,
  handleInput1Change,
  handleInput2Change,
  handleInput3Change,
  handleByNowClick,
}) => {
  return (
    <>
      {/* <div className="modal">
        <div onClick={handlePopupToggle} className="overlay"></div>
        <div className="modal-content">
          <div className="flex"> */}
          {/* <Form>
      <Row>
        <Col>
          <Form.Control placeholder="First name" />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" />
        </Col>
      </Row>
    </Form> */}
            {/* <input type="text" name="input1" onChange={handleInput1Change} />
            <input type="text" name="input2" onChange={handleInput2Change} />
            <input type="text" name="input3"  onChange={handleInput3Change} />
            <button onClick={handleByNowClick}>By Now</button>
          </div> */}
          {/* <button className="close-modal" onClick={handlePopupToggle}>
            CLOSE
          </button> */}
        {/* </div>
        
      </div> */}
      {/* <section className="r">
      <div onClick={handlePopupToggle} className="overlay"></div>
         <Form className="modal-content">
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
      </section> */}
  <div
        className="popuplog "
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Log In</h2>
          <Form >
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email"  required />
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
       
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
