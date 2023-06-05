const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Profile = require("../models/profiles");
const Cv = require("../models/cv");
//generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// this function Registers a user
// the route is POST/api/users
//get a user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hashing password
  const hash = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, hash);

  //create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, role, position, user_type } = req.body;

  console.log(req.body)
  if (!username || !email || !password || !role || !user_type || !position) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hashing password
  const hash = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, hash);

  //create user
   const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role,
  });

  if (user && role === "admin") {
    Profile.create({
      user_id: user._id,
      user_type: user_type,
      name: username, 
      position: position,
      website_link: " ",
      description: " ",
      facebook: " ", 
      instagram: " ", 
      github: " ",
      linkedin: " ",
      image: " ", 
    });
    Cv.create({
      user_id: user._id,
      name: username,
      position: position,
      email: " ",
      phone: " ",
      age: " ",
      about_me: " ", 
      education: [],
      experience: [],
      image: " ",
    });
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "Profile and Cv created also.",
    });
  } else if(user && user_type === "user"){
    console.log("this is a user we will not create profile and cv for him")
  }
  else{
    res.status(400);
    throw new Error("invalid user data");
  }
});

const deleteAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await Profile.deleteOne({ user_id: user._id });
    await Cv.deleteOne({ user_id: user._id });
    await user.remove();
    res.json({ message: "Admin, Profile and CV deleted." });
  } else {
    res.status(404);
    throw new Error("Admin not found");
  }
});
// this function Authenticate a user
// the route is POST/api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid email or password");
  }
});



// this function get the users
// the route is GET/api/users
const getUsers = asyncHandler(async (req, res) => {
  // Find all users
  const users = await User.find();

  // Array to store user profiles
  const usersWithProfiles = [];

  // Iterate over each user to retrieve their profile
  for (const user of users) {
    // Find the profile associated with the user
    const profile = await Profile.findOne({ user_id: user._id });

    // Combine user and profile data
    const userWithProfile = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: profile || {} 
    };

    // Add user with profile to the array
    usersWithProfiles.push(userWithProfile);
  }

  res.status(200).json(usersWithProfiles);
});


// this function gets a user data
// the route is GET/api/users/user
const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Find the profile associated with the user
  const profile = await Profile.findOne({ user_id: userId });

  // Combine user and profile data
  const userData = {
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    profile: profile // Include the profile data in the response
  };

  res.status(200).json(userData);
});

// this function delete/logout a user
// the route is DELETE/api/users/logout
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  console.log(userId)

  // Delete the user

  if (userId) {
    let deletedP = await Profile.findOneAndDelete({ user_id: userId})
    console.log(deletedP)
    let deletedC = await Cv.findOneAndDelete({ user_id: userId})
    console.log(deletedC)
  }
  const user = await User.findByIdAndDelete(userId);
  
  console.log(user)

console.log(c)
  res.status(200).json({ id: userId });
});

// this function delete all users
// the route is DELETE/api/users/delete/all
const deleteAllUsers = asyncHandler(async (req, res) => {
  const result = await User.deleteMany({});
  res
    .status(200)
    .json({ message: `${result.c} users have been deleted.` });
});

const getNo = asyncHandler(async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});



const updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: "User role updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  deleteUser,
  deleteAllUsers,
  registerAdmin,
  deleteAdmin,
  getNo,
  updateUserRole
};
