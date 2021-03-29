
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';


  

  function Login() {

    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',
      password: '',
      error:'',
      success:false,
    })

    initializeLoginFramework();

    const [newUser , setNewUser] = useState(false);
  
    const [loggedInUser, setLoggedInUser ] = useContext(UserContext);

    const history = useHistory(); 
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };
    
    const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        setUser(res)
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    const googleSignOut = () => {
      handleSignOut()
      .then(res => {
        handleResponse(res, false); 
      })
    }

    const fbSignIn = () => {
      handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
    }
  

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    

    const handleChange = (event) => {
      let isFormValid = true;
      console.log(event.target.value);
      console.log(event.target.name);
      if(event.target.name === 'email'){
        isFormValid = validateEmail(event.target.value);
      }
      if(event.target.name === 'password'){
        const isPasswordValid = event.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(event.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
      }
      if(isFormValid){
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);
      }
      else {
        console.log('Invalid Form')}
    }


    const handleSubmit = (event) => {
      if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then (res => {
          handleResponse(res, true);

        })
      }

      if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then (res => {
          handleResponse(res, true);

        })
      }

      event.preventDefault();
    }

   const handleResponse = (res, redirect) => {
      setUser(res)
      setLoggedInUser(res);
      if (redirect){
        history.replace(from);

      }

   }


    return (
      <div style={{textAlign:'center'}}>
        {
          user.isSignedIn && 
          <div>
            <p> Welcome, {user.name}! </p>
            <img style={{ width: '40%', borderRadius: '50%' }} src={user.photo} alt="user img" />
          </div>
        }
        {
          user.isSignedIn ? <button  onClick={googleSignOut} > Sign Out </button> : <button onClick={googleSignIn} >Google Sign In </button>
        }
        <br/>
        <button onClick = {fbSignIn}>Facebook Sign In</button>

        <h1>Our Own Authentication System</h1>

        <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User Sign Up !</label>
        
        <form onSubmit={handleSubmit} action="">
          {newUser &&
            <>
            <input type="text" name="name" onBlur={handleChange} placeholder="Your Name" />
            <br/>
            </>
          }
          
          <input type="text" name="email" onBlur={handleChange} placeholder="Your Email" required/>
          <br/>
          <input type="password" onBlur={handleChange} name="password" id="" placeholder="Password" required/>
          <br/>
          <input type="submit" value={newUser?'Sign Up': 'Sign in'}/>
        </form>
        <p style={{color:"red"}}>{user.error}</p>
        {
          user.success  &&  
        <p style={{color:"green"}}>User {newUser? 'Created' : 'Logged In'} Successfully ! </p>
        }
      </div>
    );
  }

  export default Login;
