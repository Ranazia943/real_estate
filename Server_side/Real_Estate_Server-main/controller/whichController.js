import Property from "../model/propertyModel.js";
import Whishlist from "../model/whishlistModal.js";

export const  Create_WhishItem = async(req,res)=>{
    try {
        const {propertyid,title,beds,baths,category,image,size,location,price} = req.body;
        if(!propertyid ||!title ||!beds ||!baths ||!category ||!image ||!size ||!location || !price){
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }
        const exist = await Whishlist.findOne({"poster.userid":req.user._id,propertyid})
        if(exist){
            return res.status(400).json({
                success: false,
                message: 'Whish Item already exists'
            });
        }
        const poster = {
            userid: req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile
        }
        const whishItem = await Whishlist.create({propertyid,title,beds,baths,category,image,size,location,poster,price});
        res.json({
            success: true,
            message: 'Whish Item created successfully',
            whishItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const My_WhishLists = async(req,res)=>{
    try {
        const whishLists = await Whishlist.find({"poster.userid":req.user._id});
        if(!whishLists){
            return res.status(404).json({
                success: false,
                message: 'Whish Lists not found'
            });
        }
        res.json({
            success: true,
            message: 'Whish Lists fetched successfully',
            whishLists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Delete_WhishItem = async(req,res)=>{
    try {
        const {id} = req.params;
        const whishItem = await Whishlist.findByIdAndDelete(id);
        if(!whishItem){
            return res.status(404).json({
                success: false,
                message: 'Whish Item not found'
            });
        }
        res.json({
            success: true,
            message: 'Whish Item deleted successfully',
            whishItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Fetch_All_Whishlists = async(req,res)=>{
    try {
        const whishLists = await Whishlist.find();
        res.json({
            success: true,
            message: 'All Whish Lists fetched successfully',
            whishLists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const Fetch_by_length = async (req, res) => {
    try {
        const properties = await Property.find();
        const propertyIds = properties.map(property => property._id);

        const length = await Whishlist.find({ propertyid:propertyIds  });

        res.status(200).json({
            success: true,
            message: "Wish List fetched by length successfully",
            length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
