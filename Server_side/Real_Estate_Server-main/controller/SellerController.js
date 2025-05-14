import User from "../model/AuthModel.js";
import Seller from "../model/SellModal.js";

export const CraeteSellerContact = async(req,res)=>{
    try {
        const {name,phone,email,message,experience} = req.body;
        const agent = await User.findById(req.params.id);
        
        if (!agent) {
            return res.status(404).json({ success: false, message: 'Agent not found' });
        }
        if(!name || !phone || !message || !experience || !email) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        const userInfo = {
            userid: req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile,
        }
        const agentInfo = {
            agentid:agent._id,
            name: agent.name,
            profile: agent.profile,
            email: agent.email,
        }
        const sellerContact = await Seller.create({name,phone,email,message,experience,userInfo,agentInfo});
        res.status(200).json({ success: true, message: 'Seller contact created successfully', sellerContact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const AgentGetSellerContacts = async(req,res)=>{
    try {
        const sellerContacts = await Seller.find({"agentInfo.agentid":req.user._id,"deletedby.agent":false});
        res.status(200).json({ success: true, sellerContacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const UserGetAgentContacts = async(req,res)=>{
    try {
        const sellerContacts = await Seller.find({"userInfo.userid":req.user._id,"deletedby.user":false});
        res.status(200).json({ success: true, sellerContacts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


export const DeleteSellerContact = async(req,res)=>{
    try {
        const {id} = req.params;
        const sellerContact = await Seller.findById(id);
        
        if (!sellerContact) {
            return res.status(404).json({ success: false, message: 'Seller contact not found' });
        }
        const role = req.user.role;
        switch (role) {
            case "agent":sellerContact.deletedby.agent = true
            break;
            case "user":sellerContact.deletedby.user = true
            break;
        }
        await sellerContact.save();
        if(sellerContact.deletedby.agent === true && sellerContact.deletedby.user === true){
            await sellerContact.deleteOne();
        }

        res.status(200).json({ success: true, message: `${role} contact deleted successfully`,sellerContact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const CancelToogle = async(req, res) => {
    try {
        const {id} = req.params;
        const seller = await Seller.findById(id);
        console.log(seller)
        
        if (!seller) {
            return res.status(404).json({ success: false, message: 'Seller contact not found' });
        }
        const role = req.user.role;
        seller.actions.cancel =!seller.cancel;
        await seller.save();
        res.status(200).json({ success: true, message: `${role} cancellation toggled successfully`, seller });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const Fetch_All_Seller_Contacts = async(req,res)=>{
    try {
        const sellers = await Seller.find();
        res.status(200).json({
            success: true,
            message: "All buyer contacts fetched successfully",
            sellers
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}