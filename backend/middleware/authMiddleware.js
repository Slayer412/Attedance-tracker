import asyncHandler from 'express-async-handler'
import Faculty from '../Models/facultyModel.js'
import Student from '../Models/studentModel.js'
import jwt from 'jsonwebtoken'
const protect = asyncHandler( async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user = await Faculty.findById(decode.id).select('-password')
            // console.log(req.headers.authorization)
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ("Not authorised, token failed")
        }
    }
    if(!token){
        console.log('Token not found')
            res.status(401)
            throw new Error ("Not authorised, no token")
    }
})

const protectStudent = asyncHandler( async (req,res,next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user = await Student.findById(decode.id).select('-password')
            // console.log(req.headers.authorization)
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error ("Not authorised, token failed")
        }
    }
    if(!token){
        console.log('Token not found')
            res.status(401)
            throw new Error ("Not authorised, no token")
    }
})


export {protect,protectStudent}