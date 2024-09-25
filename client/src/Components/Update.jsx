import { useState, useEffect } from "react";
import { getCookie } from "./Account";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

const Update = () => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [heading, setHeading] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [blog, setBlog] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://s60-vinay-blogie.onrender.com/update/${id}`)
      .then((response) => {
        const blogData = response.data;
        if (blogData) {
          setAuthor(blogData.author);
          setEmail(blogData.email);
          setHeading(blogData.heading);
          setImage(blogData.image);
          setImage2(blogData.image2);
          setBlog(blogData.blog);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    // Fetch author name from cookie
    const username = getCookie("username");
    if (username) {
      setAuthor(username);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update blog data
    axios
      .put(`https://s60-vinay-blogie.onrender.com/update/${id}`, {
        author,
        email,
        heading,
        image,
        image2,
        blog,
      })
      .then((result) => {
        console.log(result);
        navigate("/settings");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main">
      <div>
        <nav>
          <div className="div1">
            <img src={logo} alt="Logo" className="logo-blog" />
            <div className="div22">
              <Link to="/" className="link">
                <h3>Home</h3>
              </Link>
              <Link to="/about" className="link">
                <h3>About</h3>
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <center>
        <div className="input-content">
          <form onSubmit={handleSubmit}>
            <div className="">
              <label htmlFor="text">Author name : </label>
              <input
                type="text"
                placeholder="Enter your name"
                value={author}
                readOnly
              />
              <br />
            </div>
            <div className="input">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="text">About : </label>
              <input
                type="text"
                placeholder="Enter the Blog heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="text">Image link : </label>
              <input
                type="text"
                placeholder="Enter your image link here"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="input">
              <label htmlFor="text">Image2 link : </label>
              <input
                type="text"
                placeholder="Enter your image link here"
                value={image2}
                onChange={(e) => setImage2(e.target.value)}
              />
            </div>

            <div className="input">
              <p>Write your Blog : </p>
              <br />
              <textarea
                name="blog"
                id=""
                cols="55"
                rows="25"
                value={blog}
                onChange={(e) => setBlog(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="menu__button">
                <span>Submit</span>
            </button>
          </form>
        </div>
      </center>
    </div>
  );
};

export default Update;
