import { React, useRef, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
export default function Signup() {
  const nameRef = useRef(); // Add a reference for the name input field
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Inside your Signup component
  async function handleSubmit(e) {
    e.preventDefault();
  
    const password = passwordRef.current.value;
    const confirmPassword = passwordConfirmRef.current.value;
  
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }
  
    if (password.length < 8) {
      return setError("Password must be at least 8 characters long");
    }
    if(!/(?=.*[a-z])/.test(password)){
      return setError("Password must one lowercase letter,");

    }
    if(!/(?=.*\d)/.test(password)){
      return setError("Password must one digit,");

    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return setError("Password must  one uppercase letter ");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, password, nameRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account: " + error.message);
    }
  
    setLoading(false);
  }
  


  return (
    <>
      {/* <div
        className="d-flex align-items-center justify-content-center "
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                id="password"
                type="password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirm">
                Password Confirmation
              </Form.Label>
              <Form.Control
                id="password-confirm"
                type="password"
                ref={passwordConfirmRef}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
      </div>
      </div> */}
      <div className="fix signup ">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" className="totlog">
            Sign Up
          </Typography>
                    {error && <Alert variant="danger" className="errors">{error}</Alert>}

          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
            <div class="relative z-0 w-full mb-6 group">
        <input
          type="text"
          ref={nameRef} // Attach the reference to the name input field
          name="floating_name"
          id="floating_name"
          class="block py-2.5 px-0 w-full text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-900 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer"
          placeholder=" "
          maxLength={20}
          required
        />
        <label
          for="floating_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-light-blue-300 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name
        </label>
      </div>
            <div class="relative z-0 w-full mb-6 group">
      <input type="email"           maxLength={20}
 ref={emailRef} name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full  text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-900 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-light-blue-300 peer-focus:dark:text-red-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="password"           maxLength={20}
 ref={passwordRef} name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full  text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer" placeholder=" " required />
      <label for="floating_password"  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="password"           maxLength={20}
 ref={passwordConfirmRef} name="floating_password " id="floating_password" class="block py-2.5 px-0 w-full  text-white  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-y-cyan-400 peer" placeholder=" " required />
      <label for="floating_password"  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-300 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password Confirmation</label>
  </div>
  
              {/* <input size="lg" label="Email"  required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John"  />
              <input type="password" size="lg" label="Password"  required />
              <input type="password" size="lg" label="Password Confirmation"  /> */}
           
            </div>
         
            <Button className="mt-6 " fullWidth type="submit" disabled={loading} >
              Register
            </Button>
            <Typography color="gray" className="mt-4 text-center hgt font-normal">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-blue-300 transition-colors hover:text-blue-300">
                Sign In
              </Link>

            </Typography>
          </form>
        </Card>
      </div>
    </>
  );
}
