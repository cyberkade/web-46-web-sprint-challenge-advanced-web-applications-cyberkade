import axios from "axios";
import React, { useState } from "react";

const initialState ={
  username: '',
  password:''
}

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState(initialState)
  const [error, setError] = useState(null)

  const { history } = props;

  const handleError = () => {
    if(credentials.username !== 'Lambda' || credentials.password !== 'School'){
      setError('Invalid username or password')
    } else {
      setError(null);
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
    console.log(credentials)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/api/login', credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      history.push('/bubbles')
    })
    .catch(err => console.log(err))
  }
    

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <label>
            UserName:
            <input onChange={handleChange} id='username' name='username' type= 'text' value={credentials.username} ></input>
          </label>
          <label>
            Password:
            <input onChange={handleChange} id='password' name='password' type= 'password' value={credentials.password} ></input>
          </label>
          <button onClick={handleError} type='submit' id='submit'>Log in</button>
        </form>
      </div>

      <p id="error" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"