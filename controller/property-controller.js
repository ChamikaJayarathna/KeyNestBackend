import Property from "../schema/Property.js";

export const addPost = async (req, res) => {
    const { title, images, address, description, price, city, bedroom, type, property, utilities, pet } = req.body;

    try {

        if((!title || !address || !description || !price || !city || !bedroom || !type || !property || !utilities || !pet)){
            return res.status(400).json({ message: 'All required fields must be filled' });
        }
    
        const newProperty = new Property({
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
            pet
        });
        const savedProperty = await newProperty.save();
        res.status(201).json(savedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
    

}; 