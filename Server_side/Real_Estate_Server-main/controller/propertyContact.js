import User from "../model/AuthModel.js";
import Property_Contact from "../model/Property_Contact.js";
import Property from "../model/propertyModel.js";

export const Create_Property_Contact = async (req, res) => {
    try {
        const {name,phone,contactmessage} = req.body;
        const property = await Property.findById(req.params.id);
        
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        if(!name || !phone || !contactmessage){
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const propertyInfo = {
            propertyid:property._id,
            title: property.title,
            image:property.images[0],
        }
        const userInfo = {
            userid: req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile,
        }
        const agentInfo = {
            agentid:property.property_poster.id,
            name: property.property_poster.name,
            profile: property.property_poster.profile,
            email: property.property_poster.email,
        }
        const contact = await Property_Contact.create({name,phone,contactmessage,propertyInfo,userInfo,agentInfo});
        res.status(200).json({
            success: true,
            message: 'Property contact created successfully',
            contact
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const Get_Property_Contacts = async (req, res) => {
    try {
        const contacts = await Property_Contact.find({"agentInfo.agentid":req.user._id,"deletedby.agent":false});
        res.status(200).json({
            success: true,
            message: 'Property contacts fetched successfully',
            contacts
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const Get_Property_Contact = async (req, res) => {
    try {
        const {id} = req.params;
        const contact = await Property_Contact.findById(id);
        
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Property contact not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Property contact fetched successfully',
            contact
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const Delete_Property_Contact = async (req, res) => {
    try {
        const {id} = req.params;
        const contact = await Property_Contact.findById(id);
        
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Property contact not found' });
        }
        const role = req.user.role;
        switch (role) {
            case "user":contact.deletedby.user = true;                
                break;
            case "agent":contact.deletedby.agent = true;                
                break;
        }
        await contact.save();
        if(contact.deletedby.user===true && contact.deletedby.agent===true){
            await contact.deleteOne();
        }
        res.status(200).json({
            success: true,
            message: `${req.user.role} contact deleted successfully`,
            contact
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const Fetch_Property_Dealers = async (req, res) => {
    try {
        const dealers = await Property_Contact.find({"userInfo.userid":req.user._id,"deletedby.user":false})
        res.status(200).json({
            success: true,
            message: 'Property dealers fetched successfully',
            dealers
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const User_Cancel_Property_Toggle = async (req, res) => {
    try {
        const {id} = req.params;
        const property = await Property_Contact.findById(id);
        
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        property.actions.cancel = true;
        await property.save();
        res.status(200).json({
            success: true,
            message: 'Property cancellation toggled successfully',
            property
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const Fetch_All_Buyer_Contacts = async(req,res)=>{
    try {
        const buyers = await Property_Contact.find();
        res.status(200).json({
            success: true,
            message: "All buyer contacts fetched successfully",
            buyers
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const ToggleByuserConformProperty = async(req,res)=>{
    try {
        const property = await Property_Contact.findById(req.params.id);
        if(!property){
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        property.actions.complete = true;
        await property.save();
        const user = await User.findById(property.agentInfo.agentid);
        user.finance.completedProperties +=1
        await user.save();
        const pureproperty = await Property.findById(property.propertyInfo.propertyid);
        pureproperty.isavailable = false;
        await pureproperty.save();
        res.status(200).json({ success: true, message: 'Property completed toggled successfully', property,user })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
export const Rejection_Toggle = async(req,res)=>{
    try {
        const property = await Property_Contact.findById(req.params.id);
        if(!property){
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        property.actions.rejected = true;
        await property.save();
        res.status(200).json({ success: true, message: 'Property Rejected toggled successfully', property })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}