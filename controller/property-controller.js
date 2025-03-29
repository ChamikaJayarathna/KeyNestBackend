import Property from "../schema/Property.js";

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getSingleProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const addProperty = async (req, res) => {
  const {
    title,
    address,
    description,
    price,
    city,
    bedroom,
    bathroom,
    latitude,
    longitude,
    type,
    property,
    utilities,
    pet,
    images,
  } = req.body;
  let authorId = req.user?._id;

  try {
    const newProperty = new Property({
      title,
      images,
      address,
      description,
      price,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
      utilities,
      pet,
      author: authorId,
    });

    await newProperty.save();
    res.status(201).json("Save listing successfully!");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res.status(404).json({ message: "Property listing not found" });
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Property listing updated successfully!",
      updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  let authorId = req.user?._id;

  try {
    if (!authorId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const existingProperty = await Property.findById(id);

    if (!existingProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    if (existingProperty.author.toString() !== authorId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this property" });
    }

    await Property.findByIdAndDelete(id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const searchProperty = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const searchQuery = {
      $or: [
        { title: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { property: { $regex: query, $options: "i" } },
      ],
    };

    const properties = await Property.find(searchQuery);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getUserProperties = async (req, res) => {
  try {
    const userId = req.user?._id;
    const userPropertyDetails = await Property.find({ author: userId });
    return res.status(200).json(userPropertyDetails);
  } catch (error) {
    res.status(500).json({ error: "Server error, please try again later." });
  }
};
