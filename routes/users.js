const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user")
const router = express.Router(); 

//get all users
router.get('/', async (req,res)=>{

    try {
        const users = await User.find()
        res.json(users);
    } catch (e) {
        return res.status(500).json({message:e})
    }
res.send("ok")
})

//get one users
router.get('/:id', getUser, (req,res)=>{
    res.send(res.user)
    })

//create one users
router.post('/', async(req,res)=>{
    
    const newYouser =  await new User({
        
    fullname: req.body.fullname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password,11)

    })
    try {
        const createduser = await newYouser.save()
        return res.status(201).json("success")
    } catch (e) {
        return res.status(400).json({message:e.message})   
    }


    res.send("ok")
    })

//update one users
router.post('/:id',getUser,async (req,res)=>{
    res.send(res.user.name)
    })

//delete one users
router.delete('/:id',getUser, async (req,res)=>{
    try {
        await res.user.remove();
        return res.status(200).json("user deleted")
    } catch (error) {
        return res.status(500).json({message:e.message})
    }
    })

/*----------------- moddleware get user by id ----------------*/
  async  function getUser(req, res, next){
      let user;
try {
     user = await User.findById(req.params.id)
    if(user == null){
        return res.status(404).json({message:"user was not found"})
    }
} catch (e) {
    return res.status(500).json({message:e.message})
}
res.user = user;
next();
    }
/*----------------- end of moddleware get user by id ----------------*/

 module.exports = router;