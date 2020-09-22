const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const auth = require("../middlewares/auth");
const { db } = require("../models/User");
router.post("/register", async (req, res, next) => {
  const { name, username, email, password, dob } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "Account with the entered emailId already exists!" }],
      });
    }
    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "The entered Username has already been taken!" }],
      });
    }
    let avatar = `https://avatars.dicebear.com/api/human/${Math.floor(
      Math.random() * 5000
    )}.svg`;
    user = new User({
      avatar,
      name,
      username,
      email,
      password,
      dob,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.json("user saved");
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      user: {
        id: user.id,
        avatar: user.avatar,
        username: user.username,
        name: user.name,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 2000000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/post", auth, (req, res) => {
  const { user, tweetText } = req.body;
  let tweet = new Tweet({
    user,
    tweetText,
  });
  tweet
    .save()
    .then(() => {
      res.json("saved your tweet");
    })
    .catch((err) => {
      res.status(500).send("err");
    });
});

router.get("/tweets", auth, async (req, res) => {
  let tweetsArr = [];
  await Tweet.find().then(async (tweets) => {
    for (tw of tweets) {
      await User.findById(tw.user).then(async (us) => {
        let ob = {
          avatar:us.avatar,
          name: us.name,
          username: us.username,
          tweet: tw.tweetText,
        };
        tweetsArr.push(ob);
      });
    }
  });
  res.json(tweetsArr.reverse());
});
module.exports = router;
