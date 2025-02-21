import Property from "../schema/Property.js";

export const addProperty = async (req, res) => {
    const { title, address, description, price, city, bedroom, type, property, utilities, pet, images } = req.body;
    let authorId = req.userId;
  
    try {
      if (!authorId) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
  
      if ((!title || !address || !description || !price || !city || !bedroom || !type || !property || !utilities || !pet)) {
        return res.status(400).json({ message: 'All required fields must be filled' });
      }
  
      const newProperty = new Property({
        author: authorId,
        title,
        images, // Store image URLs directly
        address,
        description,
        price,
        city,
        bedroom,
        type,
        property,
        utilities,
        pet
      });
  
      const savedProperty = await newProperty.save();
      res.status(201).json(savedProperty);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  