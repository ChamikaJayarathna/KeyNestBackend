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
    type,
    property,
    utilities,
    pet,
    images,
  } = req.body;
  let authorId = req.userId;

  try {
    if (!authorId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (
      !title ||
      !address ||
      !description ||
      !price ||
      !city ||
      !bedroom ||
      !type ||
      !property ||
      !utilities ||
      !pet
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newProperty = new Property({
      author: authorId,
      title,
      images,
      address,
      description,
      price,
      city,
      bedroom,
      type,
      property,
      utilities,
      pet,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
