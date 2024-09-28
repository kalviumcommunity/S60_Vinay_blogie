import { useState, useEffect } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png'
import AccountDetails from "./Modal"

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [loginbtn, setLoginBtn] = useState(false);

  const navigate = useNavigate()

  function getCookie(name) {
    let cookieArray = document.cookie.split('; ')
    let cookie = cookieArray.find((row) => row.startsWith(name + '='))
    return cookie ? cookie.split('=')[1] :""
  }
  
  // Date function
  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const formattedDate = date.toLocaleDateString();
      setCurrentDate(formattedDate);
    };
    getCurrentDate();
    const interval = setInterval(getCurrentDate, 1000);
    return () => clearInterval(interval);
  }, []);
   // Time function
  useEffect(() => {
    const getCurrentTime = () => {
      const date = new Date();
      const formattedTime = date.toLocaleTimeString();
      setCurrentTime(formattedTime);
    };
    getCurrentTime(); 
    const interval = setInterval(getCurrentTime, 1000); 
    return () => clearInterval(interval);
  }, [])
  useEffect(() => {
    axios
    .get("https://s60-vinay-blogie.onrender.com/getdata")
    .then((response) => {
      console.log(response.data)
      setBlogs(response.data)
    })
    .catch((err) => console.log(err))
  }, [])


  useEffect(() => {
    if (getCookie("authToken")) {
      console.log("enjoy chey mowa")
      setLoginBtn(true)
    } else {
      navigate("/login")
    }
  }, [navigate])


  const handleLogout = () => {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setLoginBtn(false);
    navigate("/login");
  };

  return (
    <div className='main'>
      <nav>
        <div className="div1">
          <div className='mainlogodiv'>
            <div>
            <img src={logo} alt="Logo" className="logo-home" />
            </div>
            <div className='dates'>
              <p className='date'>Date: {currentDate}</p>
              <p className='time'>Time: {currentTime}</p>
            </div>
          </div>
          <div className="div2">
            <Link to="/" className="link">
              <h3 className='nav-btn'>Home</h3>
            </Link>
            <Link to="/blog" className="link">
              <h3 className='nav-btn'>Create a Blog</h3>
            </Link>
            <Link to="/about" className="link">
              <h3 className='nav-btn'>About</h3>
            </Link>
            <Link to="/authors" className='link'>
              <h3 className='nav-btn'>Authors</h3>
            </Link>
            {loginbtn ? (
              <Link to="/login" className='link' onClick={handleLogout}>
              <h3 className='nav-btn'>Logout</h3>
            </Link>
            ) : (
              <Link to="/login" className='link'>
                <h3 className='nav-btn'>Login</h3>
              </Link>
            )}
            
            {/* <img src={profile} alt="" className='profile1' /> */}
            <AccountDetails/>
          </div>
          
        </div>
      </nav>
      <div className="big-font">
        <center>
          <h1>Read or Create Your</h1>
          <h1>ideas💡 here !</h1>
        </center>
      </div>
      <center>
        {blogs.length === 0 ? (
          <div className="no-blogs">
            <center>
              <h2 className="first-author">Be the first author of</h2>
              <img src={logo2} alt="" className="logo2" />
            </center>
            <Link to="/blog" className="link">
              <button className="btn-12">
                <span>Create a Blog</span>
              </button>
            </Link>
          </div>
        ) : (
          blogs.slice().reverse().map((blog) => (
            <div className="blog" key={blog._id}>
              <div className='.blog-heading'>
                <center>
                  <h2>{blog.heading}</h2>
                </center>
              </div>
              <br />
              <div className='blog-image'>
                  <img src={blog.image} alt="" className="blog-image1" style={{ width: '260px' , borderRadius: "10px"}} />
                  <img src={blog.image2} alt="" className='blog-image2' style={{ width: '260px' , borderRadius: "10px" }} />
              </div>
              <div className="text">
                <center>
                  <p>{blog.blog}</p>
                </center>
              </div>
              <div className="contacts">
                <p>
                  <strong>Created by {blog.author}</strong>
                </p>
                <br />
                <p>
                  Contact {blog.author} at {blog.email}
                </p>
              </div>
            </div>
          ))
        )}
      </center>
      <center>
        <p>Made with ❤️ by Vinnu</p>
      </center>
    </div>
  );
};

export default Home;