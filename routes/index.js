const express = require("express");

const router = express.Router(); 
router.get('/', (req,res)=>{
    res.render("index")
})


//post login 1 big headed user
router.post('/login', async (req,res)=>{
    const isemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.identifier);
        if(isemail){
         const user = await User.find({email:req.body.identifier})
         try {
            if(await bcrypt.compare(req.body.password, user[0].password)){
                let JWT = jwt.sign(
                    {id:user[0]._id,
                    email:user[0].email,
                    accountNumber:user[0].accountNumber, 
                    role:user[0].role, 
                    fullname:user[0].fullname
                },
                process.env.ACCESS_TOKEN_SECRET);
                return  res.status(200).json([JWT, user[0]])
            }
            else{
                return res.status(400).send({message:"incorrect password"})
            }
           } catch (e) {
               return res.status(500).send({message:""})
           }
        } else{
         const user = await User.find({ accountNumber:req.body.identifier})
         try  {
            if(await bcrypt.compare(req.body.password, user[0].password)){
                 let JWT = jwt.sign({id:user[0]._id, email:user[0].email, accountNumber:user[0].accountNumber, role:user[0].role, fullname:user[0].fullname}, process.env.ACCESS_TOKEN_SECRET);
              return  res.status(200).json([JWT, user[0]])
            }
            else{
                return res.status(400).send({message:"incorrect password"})
            }
           } catch (e) {
               return res.status(501).send({message:e})
           }
        }        
 })



 module.exports = router;