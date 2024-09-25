import logo2 from "../assets/logo2.png";
import { useState, useTransition } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // Import js-cookie

axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("https://s60-vinay-blogie.onrender.com/auth/login", {
        email,
        password,
      });
    
      console.log(response);
      
      // Access the username from the response
      const { username, authToken } = response.data; // Adjust according to your response structure

      Cookies.set('username', username, { expires: 1 });
      Cookies.set('authToken', authToken,{ expires: 1 });
    
      navigate("/");
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert(error.message || "An error occurred during login");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    
  };
  
  function forgot(){
    setLoading(true)
    if (email){
      axios.post("https://s60-vinay-blogie.onrender.com/auth/otp",{email}).then((res)=>{
        const otp=res.data
        sessionStorage.setItem("qed-et",otp)
        navigate("/forgotpass",{state:{email}})
      })
    }
    else{
      alert("please fill the email in the form and submit.Thank you")
    }
  }

  return (
    <div>
      <div className="main-page1">
        <div>
        {loading && (
            <div className="loader-container">
              <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          <h2 className="welcome">Welcome to</h2>
          <img src={logo2} alt="" className="logo3" />
        </div>
        <div className="register-box">
          <center><h2>Login here!</h2></center>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="label">Email : </label>
              <input type="email" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password" className="label">Password : </label>
              <input type="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <p>Enjoy our space by clicking login</p>
            <br />
            <p onClick={forgot} className="links">Forgot password?</p>
            <div>
            <Link to="/register"><br/><p>Not having an Account ?</p></Link>
              {!loading ? (<center>
                <button type="submit" className="login-btn">Login</button>
              </center>) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;