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
    carSpaces,
    latitude,
    longitude,
    type,
    property,
    condition,
    utilities,
    pet,
    filter,
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
      carSpaces,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      type,
      property,
      condition,
      utilities,
      pet,
      filter: filter || {},
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
    res.status(500).json({ error: "Server error, please try again later." });
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

export const filterProperties = async (req, res) => {
  try {
    const {
      price,
      bedroom,
      bathroom,
      carSpaces,
      condition,
      transactionType,
      propertyTypes,
      filter,
    } = req.body;
    const query = {};

    const filterMapping = {
      transactionType: "type",
      propertyTypes: "property",
      condition: "condition",
    };

    const transactionTypeMapping = {
      rent: "Rent",
      buy: "Buy",
      sell: "Sell",
    };

    const propertyTypeMapping = {
      apartment: "Apartment",
      house: "House",
      land: "Land",
      townhouse: "Townhouse",
      villa: "Villa",
      retirementLiving: "Retirement Living",
      acreage: "Acreage",
      rural: "Rural",
    };

    const conditionMapping = {
      new: "New",
      established: "Established",
    };

    const selectedTransactionTypes = Object.keys(transactionType || {})
      .filter((key) => transactionType[key])
      .map((key) => transactionTypeMapping[key]);

    const selectedPropertyTypes = Object.keys(propertyTypes || {})
      .filter((key) => propertyTypes[key])
      .map((key) => propertyTypeMapping[key]);

    const selectedConditions = Object.keys(condition || {})
      .filter((key) => condition[key])
      .map((key) => conditionMapping[key]);

    if (selectedTransactionTypes.length > 0) {
      query[filterMapping.transactionType] = { $in: selectedTransactionTypes };
    }

    if (selectedPropertyTypes.length > 0) {
      query[filterMapping.propertyTypes] = { $in: selectedPropertyTypes };
    }

    if (selectedConditions.length > 0) {
      query[filterMapping.condition] = { $in: selectedConditions };
    }

    if (bedroom) query.bedroom = { $gte: Number(bedroom) };
    if (bathroom) query.bathroom = { $gte: Number(bathroom) };
    if (carSpaces) query.carSpaces = { $gte: Number(carSpaces) };
    if (price) query.price = { $lte: Number(price) };

    if (filter) {
      Object.keys(filter).forEach((category) => {
        Object.keys(filter[category]).forEach((feature) => {
          if (filter[category][feature]) {
            query[`filter.${category}.${feature}`] = true;
          }
        });
      });
    }

    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

export const filterByPropertyType = async (req, res) => {
  try {
    const { property } = req.body;

    if (!property) {
      return res.status(400).json({ message: "Property type is required" });
    }

    const validTypes = [
      "Apartment",
      "House",
      "Land",
      "Townhouse",
      "Villa",
      "Retirement Living",
      "Acreage",
      "Rural",
    ];

    if (!validTypes.includes(property)) {
      return res.status(400).json({ message: "Invalid property type" });
    }

    const properties = await Property.find({ property });

    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error, please try again later.",
      error: error.message,
    });
  }
};

export const getTotalPropertyListingCount = async (req, res) => {
  try {
    const totalPropertyCount = (await Property.countDocuments()) || 0;
    return res.status(200).json({ count: totalPropertyCount });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};

export const getUserTotalPropertyListingCount = async (req, res) => {
  try {
    const userId = req.user?._id;
    const totalPropertyCount = await Property.countDocuments({
      author: userId,
    });
    return res.status(200).json({ count: totalPropertyCount });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error, please try again later." });
  }
};
