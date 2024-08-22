const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Data = require("./schema.js");
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const {UserRouter} = require("./routes/routes.js");
const User = require("./models/User.js");
const app = express();
dotenv.config()


app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}));
app.use(cookieParser())
app.use(express.json());
app.use("/auth", UserRouter)

app.post("/data", async (req, res) => {
  const { author, email, heading, blog, image, image2 } = req.body;
  const newBlog = new Data({
    author,
    email,
    heading,
    blog,
    image,
    image2
  });
  await newBlog.save();
  return res.json({ status: true, message: "Blog is stored in DB" });
});
app.post("/blog/:username",async (req,res)=>{
  const username=req.params.username
  // console.log(username)
  const blogs=await Data.find({author:username})
  // console.log(blogs)
  res.send(blogs)
})

app.get('/update/:id', (req, res) => {
  const id = req.params.id;
  Data.findById(id)
    .then(blogData => {
      if (!blogData) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { author, email, heading, image, image2, blog } = req.body; // Extract values from req.body

  Data.findByIdAndUpdate(id, { author, email, heading, image, image2, blog })
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch(err => {
      console.error("Error while updating data:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/getdata", async (req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.log("err is occured");
    });
});
app.delete("/delete/:id", (req,res) => {
  const id = req.params.id
  Data.findByIdAndDelete({_id:id})
  .then(res => res.json(res))
  .catch(err => res.json(err))
})


app.listen(process.env.PORT || 3001, async () => {
  await mongoose.connect(
    "mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/blogie?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("server is running");
});
