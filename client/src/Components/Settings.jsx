import { useEffect, useState } from "react"
import axios from "axios"
import profile from "../assets/profile.webp"
import {Link} from "react-router-dom"
import { getCookie } from "./Account"
import Deletebtn from "./Deletebtn"
import logo from '../assets/logo.png';
const Settings = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.post(`https://s60-vinay-blogie.onrender.com/blog/${getCookie("username")}`);
        setBlogs(response.data);
        console.log(response.data); // Logging the received data for debugging
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
    fetchBlogs();
  }, []); 

  const handleDelete = (id) => {
    axios.delete(`https://s60-vinay-blogie.onrender.com/delete/${id}`)
    .then(res => {
      console.log(res)
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="main">
      <nav>
        <div className="div1">
          <div className='mainlogodiv'>
            <div>
            <img src={logo} alt="Logo" className="logo-home" />
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
          
            {/* <img src={profile} alt="" className='profile1' /> */}
          
          </div>
          
        </div>
      </nav>
        <div className="settings-div">
      <h1 className="settings">Settings</h1>
      <div className="settings-div1">
        <img src={profile} alt="" className="profile2" />
        <div className="settings-info">
          <div className="settings-info1">
            <div className="badge-div">
                <p className="badge">Username :</p>
                <p>{getCookie("username")}</p>
            </div><hr />
            <div className="badge-div">
                <p className="badge">Email :</p>
                <p>vinnu@gmail.com</p>
            </div><hr />
            <div className="badge-div">
                <p className="badge">No of blogs :</p>
                <p>{blogs.length}</p>
            </div><hr />
        </div>
        <div className="settings-info2">
            <div className="badge-div">
                <p className="badge">Badge :</p>
                <p>None</p>
            </div><hr />
            <div className="badge-div">
                <p className="badge">Language :</p>
                <p>English</p>
            </div><hr />
        </div>
        </div>
      </div>
      <h2 className="settings1">Blogs which are created by you :</h2>
        <center>
        {blogs.map((blog) => (
        <div className="blog" key={blog._id}>
          <div className='.blog-heading'>
            <center>
              <h2>{blog.heading}</h2>
            </center>
          </div>
          <div className='blog-image'>
            <center>
              <img src={blog.image} alt="" className="blog-image" />
            </center>
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
          <br />
          <div className="spsbtns">
            <div onClick={() => handleDelete(blog._id)}>
          <Deletebtn/></div>
          <div>
            <Link to={`/update/${blog._id}`}>
          <button className="btn-update"> Update
          </button></Link>
          </div>
          </div>
        </div>
      ))}
      </center>
    </div>
    </div>
  )
}

export default Settings
