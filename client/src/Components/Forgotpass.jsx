import logo2 from "../assets/logo2.png";
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

const OTPValidation = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email=useLocation().state.email
  console.log(email)
  const valid=sessionStorage.getItem("qed-et")

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(otp)
    
    try {
      const response = await axios.put("https://s60-vinay-blogie.onrender.com/auth/otpvalid", {
        email,
        valid,
        otp,
        password,
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("An error occurred during OTP validation:", error);
      alert("OTP or Password incorrect!");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

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
          <center><h2>Forgot Password?</h2></center>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="label">OTP</label>
              <input type="text" id="otp" onChange={(e) => setOtp(e.target.value)} required />
            </div>
            <div>
              <label htmlFor="password" className="label">New Password</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
              {!loading ? (
                <center>
                  <button type="submit" className="login-btn" >Done!</button>
                </center>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OTPValidation;