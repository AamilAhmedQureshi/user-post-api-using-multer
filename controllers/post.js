const { postModel, userModel } = require("../models");

const { User } = userModel;
const { Post, validatePost } = postModel;

exports.getPost = async (req, res) => {
  const post = await Post.find({});
  if (!post) return res.send("Post Not Found");
  res.send(post);
};

exports.addPost = async (req, res) => {
  let fileName = req.files;
  if (!fileName) return res.status(400).send("Please upload a file");
  console.log(fileName);

  const name = [],
    type = [];
  fileName.forEach((item, index) => {
    type[index] = item.mimetype;
    name[index] = item.filename;
  });

  const { error } = await validatePost(req.body);
  if (error) return res.status(400).send(error);

  let { userId, post_title, post_content } = req.body;

  const userInfo = await User.findOne({ _id: userId });
  if (!userInfo) return res.status(400).send("User Not Found");

  const post = new Post({
    user: userInfo.first_name,
    post_title,
    post_content,
    file: {
      file_type: type,
      file_name: name,
    },
  });
  await post.save();
  console.log(post);
  res.send(post);
};

exports.updatePost = async (req, res) => {
  let fileName = req.files;
  if (!fileName) return res.status(400).send("Please upload a file");
  console.log(fileName);

  const name = [],
    type = [];
  fileName.forEach((item, index) => {
    type[index] = item.mimetype;
    name[index] = item.filename;
  });

  let { postId, post_title, post_content } = req.body;

  const postInfo = await Post.findOne({ _id: postId });
  if (!postInfo)
    return res.status(400).json({ error: true, message: "PostId Not Found" });

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    {
      $set: {
        post_title: post_title,
        post_content: post_content,
        file: {
          file_type: type,
          file_name: name,
        },
      },
    },
    { new: true }
  );
  res.send(post);
};

exports.deletePost = async (req, res) => {
  let { id } = req.body;
  const postInfo = await Post.findOne({ _id: id });
  if (!postInfo) return res.status(400).send("PostId Not Found");

  const post = await Post.deleteOne({ _id: id });
  res.send(post);
};
