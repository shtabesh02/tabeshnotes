const express = require('express');
const router = express.Router();
const {UserProfile, User} = require('../../db/models');
const { where } = require('sequelize');
// const {User} = require('../../db/models')

router.get('/:username', async (req, res) => {
    const { username } = req.params;
    
    const currentUser = await User.findOne({where: {username: username},
    include: {
        model: UserProfile
    }})
    res.status(200).json(currentUser)
    // const userprofile = await UserProfile.findOne({where: {user_id: user_id},
    // include: {
    //     model: User
    // }});
    // if(currentUser){
    //     res.status(200).json(currentUser)
    // }else{
    //     res.status(404).json({
    //         message: "no record found."
    //     })
    // }
});

router.put('/:user_id', async (req, res) => {
    const {user_id, photo, github, linkedin, bio} = req.body;
    const currentProfile = await UserProfile.findOne({where: {user_id: user_id }});
    const updatedProfile = await currentProfile.set({
        user_id,
        photo,
        github,
        linkedin,
        bio
    })
    await updatedProfile.save();
    res.status(200).json(updatedProfile);
});

router.post('/:user_id', async (req, res) => {
    const {user_id, photo, github, linkedin, bio} = req.body;
    const addedprofile = await UserProfile.create({
        user_id,
        photo,
        github,
        linkedin,
        bio
    });
    const profilesuser = await User.findOne({where: {id: user_id},
    include: {
        model: UserProfile
    }});
    console.log('profilesuser: ', profilesuser)
    res.status(200).json(profilesuser);
})

module.exports = router