import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schema/User.js";
import Property from "../schema/Property.js";

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.MY_SECRET_KEY, { expiresIn: "5d" });
};

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (username.length < 5) {
    return res
      .status(403)
      .json({ error: "Username must be at least 5 letters long" });
  }

  if (!email.length) {
    return res.status(403).json({ error: "Enter Email" });
  }

  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }

  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
    });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser
    .save()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ error: "Email not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(403).json({ error: "Invalid Password" });
    }

    const token = createToken(user._id);
    res
      .status(200)
      .json({ message: "Login successfully", token, role: user.role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.status(200).json({ count: userCount });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const editUserDetails = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (username && username.length < 3) {
    return res
      .status(403)
      .json({ error: "Username must be at least 3 letters long" });
  }

  if (password && !passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters",
    });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res
      .status(200)
      .json({ message: "User details updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getOwnersProfileDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const propertyListing = await Property.findById(id);

    if (!propertyListing) {
      return res.status(404).json({ error: "Property listing not found." });
    }

    if (!propertyListing.author) {
      return res
        .status(404)
        .json({ error: "Property has no associated owner." });
    }

    const ownerProfile = await User.findById(propertyListing.author).select(
      "-password"
    );

    if (!ownerProfile) {
      return res.status(404).json({ error: "Owner profile not found." });
    }

    return res.status(200).json(ownerProfile);
  } catch (error) {
    console.error("Error in getOwnersProfileDetail:", error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};
