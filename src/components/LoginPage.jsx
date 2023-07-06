import React, { useState } from 'react';
import { auth } from '../components/firebase';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Call Firebase Authentication API to sign in the user
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User signed in successfully
        // You can redirect the user to the main page or handle it as needed
      })
      .catch((error) => {
        // Handle sign-in error
        console.log('Sign-in error:', error);
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
