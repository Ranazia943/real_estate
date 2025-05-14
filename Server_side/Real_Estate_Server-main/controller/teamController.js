import Team from "../model/teamModel.js";


export const Create_Team_member = async(req,res)=>{
    try {
        const {name,email,image,linkedin_link,facebooklink,twitterlink} = req.body;
        if(!name || !email || !image || !linkedin_link || !facebooklink || !twitterlink){
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields'
            });
        }
        const existingUser = await Team.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            });
        }
        const poster = {
            userid:req.user._id,
            name: req.user.name,
            email: req.user.email,
            profile: req.user.profile
        }
        const member = await Team.create({name,email,image,linkedin_link,twitterlink,facebooklink,poster});
        res.status(200).json({
            success: true,
            message: 'Team member created successfully',
            member
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Fetch_All_Team_members = async(req,res)=>{
    try {
        const teams = await Team.find();
        res.status(200).json({
            success: true,
            message: 'All team members fetched successfully',
            teams
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Delete_Team_member = async(req,res)=>{
    try {
        const {id} = req.params;
        const member = await Team.findByIdAndDelete(id);
        if(!member){
            return res.status(404).json({
                success: false,
                message: 'Team member not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Team member deleted successfully',
            member
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const Update_Team_member = async(req,res)=>{
    try {
        const {id} = req.params;
        const {name,email,image,linkedin_link,facebooklink,twitterlink} = req.body;
        const member = await Team.findByIdAndUpdate(id,{name,email,image,linkedin_link,facebooklink,twitterlink},{new:true});
        if(!member){
            return res.status(404).json({
                success: false,
                message: 'Team member not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Team member updated successfully',
            member
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
