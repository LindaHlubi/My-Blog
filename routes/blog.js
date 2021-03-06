const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const isAuth = require("../middleware/isAuth");
const { check, validationResult } = require("express-validator");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

//for image upload
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const imageFilter = (req, file, cb) => {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, true);
};
const upload = multer({
  storage: storage,
  fileFilter: imageFilter
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//post blog
router.post(
  "/",
  isAuth,
  check("title")
  //now white space

    .trim()
    .isLength({ min: 1 })
    .withMessage("Title required"),

  async (req, res) => {

    //title validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { title, body, tags, } = req.body;

    try {
      const data = new Blog({
        title,
        body,
        tags
       
      });
      const newBlog = await data.save();

      res
        .status(201)
        .json({ success: "Your post was successfull posted", newBlog });
    } catch (error) {
      if (error.name === "ValidationError") {
        res
          .status(400)
          .json({ error: "Title and blog required" });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
);

//get posts
router.get("/", async (req, res) => {
  try {
    const data = await Blog.find({}).sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, error: "Oops! Please try again" });
  }
});

//get pinned posts
/*router.get("/pinnedposts", async (req, res) => {
  try {
    const pinnedPosts = await Blog.find({ isPinned: true });
    res.status(200).json(pinnedPosts);
  } catch (err) {
    res.status(500).json({ error: "Something Went Wrong", err });
  }
});*/

// get the to 10 popular tags
router.get("/lovedtags", async (req, res) => {
  try {
    const lovedTags = await Blog.aggregate([
      // Unwind the array
      { $unwind: "$tags" },
      // Group on tags with a count
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 }
        }
      },
      // Optionally sort the tags by count descending
      { $sort: { count: -1 } },
      // Optionally limit to the top "n" results. Using 10 results here
      { $limit: 10 }
    ]);
    res.status(200).json(lovedTags);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", err });
  }
});

//get popular tag links
router.get("/lovedtaglink/:taglink", async (req, res) => {
  try {
    const docs = await Blog.find({ tags: req.params.taglink });
    res.status(200).json(docs);
    console.log(docs);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", err });
  }
});

// go to one blog
router.get("/:blogId", async (req, res) => {
  try {
    const data = await Blog.findById(req.params.blogId);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Oops! Please try again", err });
  }
});

//update / edit the blog
router.patch(
  //by id
  "/:blogid",
  isAuth,
  check("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Title required"),
  async (req, res) => {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.blogid,
        req.body,
        { new: true }
      );

      return res
        .status(200)
        .json({ success: "Your post was Successfully updated ", updatedBlog });
    } catch (err) {
      return res.status(400).json({ error: "Oops! Please try again", err });
    }
  }
);

//delete post

router.delete("/:blogid", isAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogid);
    // delete image in cloudinary
    if (deletedBlog.headerImgId) {
      await cloudinary.uploader.destroy(deletedBlog.headerImgId);
    }
    res.status(200).json({ success: "Blog deleted", deletedBlog });
  } catch (error) {
    res.status(500).json({ error: "Oops! Please try again", err });
  }
});

/*edit default image
router.put("/:blogid/editimage", isAuth, upload.single("image"), (req, res) => {
  Blog.findById(req.params.blogid).then(async blog => {
    try {
      if (blog.headerImgId) {
        await cloudinary.uploader.destroy(blog.headerImgId);
      }
      let result = await cloudinary.uploader.upload(req.file.path, {
        folder: "travelBlog/blog/headerImg"
      });
      blog.headerImg = result.secure_url;
      blog.headerImgId = result.public_id;
      blog.save().then(updatedBlog => {
        return res.status(200).json({ updatedBlog, success: "Image uploaded" });
      });
    } catch (err) {
      if (err) return res.status(400).json({ error: err.message, err });
    }
  });
});*/

module.exports = router;
