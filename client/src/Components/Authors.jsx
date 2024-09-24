import { useState, useEffect } from "react";
import axios from "axios";

const Authors = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("https://s60-vinay-blogie.onrender.com/getdata")
      .then((res) => {
        console.log(res.data);
        setData(res.data); 
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to sort authors based on the number of blogs
  const sortAuthorsByBlogCount = (blogs) => {
    const authorCountMap = new Map();
    blogs.forEach((blog) => {
      const author = blog.author;
      authorCountMap.set(author, (authorCountMap.get(author) || 0) + 1);
    });

    // Sort authors by the number of blogs in descending order
    const sortedAuthors = [...authorCountMap.entries()].sort((a, b) => b[1] - a[1]);
    return sortedAuthors.map(([author, count]) => ({ author, count }));
  };

  return (
    <div>
      <center>
        <h1 className="welcome">Our Top Authors</h1>
      </center>
      <div className="grid-container">
        {sortAuthorsByBlogCount(data).map(({ author, count }, index) => (
          <div className="grid-item" key={author}>
            <center>
              <h3>{`${index + 1}. ${author} (${count} blogs)`}</h3>
            </center>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Authors;
