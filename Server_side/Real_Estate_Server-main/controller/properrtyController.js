import Property from "../model/propertyModel.js";


export const Property_create = async (req, res) => {
    try {
        const {
            title, description,property_detail, location, price, google_map_link, property_type, size, images, amenities, category, rooms, bathrooms, years_of_build,posteddate
        } = req.body;
        const propertyid = Math.floor(100000 + Math.random() * 900000);
        const property_poster = {
            id:req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile
        }

        // Validate required fields
        if (!title || !description || !location || !price || !property_type || !property_detail || !propertyid || !size || !category || !rooms || !bathrooms || !property_poster || !posteddate) {
            return res.status(400).json({ success: false, message: "All required fields must be filled." });
        }

        // Check if property ID already exists
        const existingProperty = await Property.findOne({ propertyid });
        if (existingProperty) {
            return res.status(400).json({ success: false, message: "Property ID already exists." });
        }

        // Create new property instance
        const newProperty = await Property.create({
            title, description, location, price, google_map_link, property_type,
            propertyid, size, images, amenities, category, rooms, bathrooms,
            property_poster, years_of_build,property_detail,posteddate
        });

        return res.status(201).json({ success: true, message: "Property created successfully", property: newProperty });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


export const Fetch_Properties = async (req, res) => {
    try {
        const { category, address, property_type, amenities } = req.query;
        
        let filter = {isavailable:true};
        
        if (category) {
            filter.category = category;
        }
        if (address) {
            filter["location.address"] = { $regex: new RegExp(address, "i") }; // Case-insensitive search
        }
        if (property_type) {
            filter.property_type = property_type;
        }
        if (amenities) {
            const amenitiesArray = amenities.split(",").map(amenity => amenity.trim());
            filter.amenities = { 
                $all: amenitiesArray.map(amenity => new RegExp(`^${amenity}$`, "i")) 
            };
        }
        
        
        const properties = await Property.find(filter);
        res.status(200).json({
            success: true,
            message: "Properties fetched successfully",
            count: properties.length,
            properties
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Admin_Fetch_All_Properties = async(req,res)=>{
    try {
        const properties = await Property.find();
        res.status(200).json({
            success: true,
            message: "All properties fetched successfully",
            properties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Fetch_Property_Details = async (req, res) => {
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Property fetched successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Create_rating = async (req, res) => {
    try {
        const { message, rating } = req.body;
        const { id } = req.params;

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }

        // Find if the user has already rated the property
        const existingPropertyRating = property.reviews.find(
            (r) => r.userid.toString() === req.user._id.toString()
        );

        if (existingPropertyRating) {
            existingPropertyRating.name = req.user.name;
            existingPropertyRating.profile = req.user.profile;
            existingPropertyRating.userid = req.user._id;
            existingPropertyRating.rating = rating;
            existingPropertyRating.message = message;
        } else {
            // Add new rating
            property.reviews.push({
                userid: req.user._id,
                name: req.user.name,
                profile: req.user.profile,
                message,
                rating
            });
        }

        // Recalculate rating
        const numberOfReviews = property.reviews.length;
        const totalRating = property.reviews.reduce((acc, curr) => acc + curr.rating, 0);
        property.rating = parseFloat(totalRating / numberOfReviews).toFixed(1);
        property.numofreviews = numberOfReviews;

        await property.save();

        res.status(200).json({
            success: true,
            message: existingPropertyRating ? "Rating updated successfully" : "Rating created successfully",
            property
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const Featured_Properties = async(req,res)=>{
    try {
        const features = await Property.find({featured:true});
        res.status(200).json({
            success: true,
            message: "Featured properties fetched successfully",
            count: features.length,
            features
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Fetch_My_Properties = async(req, res) =>{
    try {
        const my_properties = await Property.find({"property_poster.id":req.user._id,isavailable:true});
        res.status(200).json({
            success: true,
            message: "My properties fetched successfully",
            count: my_properties.length,
            my_properties
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Update_Property = async(req, res) => {
    try {
        const {
            title, description,property_detail, location, price, google_map_link, property_type, size, images, amenities, category, rooms, bathrooms, years_of_build
        } = req.body;
        const { id } = req.params;
        
        const property = await Property.findByIdAndUpdate(id,{title, description,property_detail, location, price, google_map_link, property_type, size, images, amenities, category, rooms, bathrooms, years_of_build},{new:true});
        
        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Delete_Property = async(req,res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findByIdAndDelete(id);
        
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found"
            });
        }
        
        res.status(200).json({
            success: true,
            message: "Property deleted successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const FeaturedCCity_Property_Toggle = async(req,res)=>{
    try {
        const {featuredcity} = req.body;
        const property = await Property.findById();
        
        property.location.featuredcity = featuredcity;
        await property.save();
        res.status(200).json({
            success: true,
            message: "Property featured successfully",
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const Featured_Property_Toggle = async(req,res)=>{
    try {
        const {id} = req.params;
        const property = await Property.findById(id);
        
        property.featured =!property.featured;
        await property.save();
        res.status(200).json({
            success: true,
            message: `Property featured ${property.featured} successfully`,
            property
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}