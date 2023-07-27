import User from "../db/userSchema.js"

export const userRegister = async(req,res) => {
    const {name,email,phone,password}=req.body
    const findOne = await User.findOne({ $or: [{ email: email }, { phone: phone }] })
    if(!findOne){
       const Register = await new User({
        name,email,phone,password
       })
       await Register.save()
      if(Register){
        res.json({success:"User Registered"})
      }else{
        res.json({error:"Can't Register User"})
      }
    }else{
       res.json({alert:"User Already Exist"});
    }
}

export const loginUser = async(req,res) => {
    const {email,password}=req.query
    const findUser = await User.findOne({email:email})
    if(findUser){
const checkPassword = await findUser.password === password
if(checkPassword){
    res.json({success:"Login Successfull",data:findUser})
}else{
    res.json({alert:"Incorrect Password"})
}
    }else{
        res.json({alert:"User Not Found"})
    }
}

export const forgotPassword = async(req,res) => {
    const {email,phone}=req.body
    const findUser = await User.findOne({email:email})
    if(findUser){
const checkPhone = await findUser.phone === phone
if(checkPhone){
    const token = await findUser._id
    findUser.token = token
    await findUser.save()
    res.json({token:token})
}
    }else{
        res.json({alert:"Incorrect Entries"})
    }
}
export const updatePassword = async(req,res) => {
    const {token,password}=req.body
    const findUser = await User.findById(token)
    if(findUser){
        findUser.password = password
        await findUser.save()
        findUser.token = ""
       await findUser.save()
        res.json({success : "Password Updated"})
    }else{
        res.json({alert : "Invalid Link"})
    }
}
export const getUser = async(req,res) => {
    const {id} = req.query
    const findUser = await User.findById(id)
    if(!findUser){
        res.json({alert : "Please Login Again"})
    }else{
        res.json(findUser)
    }
}

export const updateProfile = async(req,res) => {
    const {_id,name,image} = req.body
    if(!_id){
        res.json({alert : "Please login to contiue"})
    }else{
        if(!name && !image){
            res.json({alert : "Please add something to update"})
        }else{
         const findUser = await User.findById(_id)
     if(findUser){
        findUser.name = name
      findUser.image = image
           await findUser.save()
        res.json({success : "Profile updated" , user:findUser})
        }else{
        res.json({error : "Can't update profile"})
     }
     }
        }
    }

    export const deleteUser = async(req,res) => {
        const {_id} = req.body
        const user = await User.findByIdAndDelete(_id)
        if(user){
            res.json({success : "User deleted"})
        }else{
            res.json({alert : "User not found"})
        }
    }