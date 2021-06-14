import Faculty from '../Models/facultyModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const facultyAuth = asyncHandler(async (req,res) => {
    const {email,password} = req.body

    const faculty = await Faculty.findOne({email})
    if(faculty && faculty.password === password){
        res.json({
            _id:faculty._id,
            name:faculty.name,
            email:faculty.email,
            facultyId:faculty.facultyId,
            password:faculty.password,
            token:generateToken(faculty._id),
        })
    }else{
        res.status(401)
        throw new Error ("Faculty not found")
    }
})

const facultyRegister = asyncHandler( async (req,res) => {
    const {name,email,facultyId,password} = req.body

    const facultyExists = await Faculty.findOne({facultyId})

    if(facultyExists){
        res.status(400)
        throw new Error("Faculty already registerd")
    }

    const faculty = await Faculty.create({
        name,
        email,
        facultyId,
        password
    })

    if(faculty){
        res.json({
            _id:faculty._id,
            name:faculty.name,
            email:faculty.email,
            facultyId:faculty.facultyId,
            token:generateToken(faculty._id),
        })
    }else{
        throw new Error('Faculty not found')
    }


})

// @ desc Get student profile
// @route GET /api/student/profile
// @access privateStudent
const getFacultyProfile = asyncHandler( async (req,res) => {
    const faculty = await Faculty.findById(req.user._id)
    if(faculty){
        res.json({
            _id:faculty._id,
            name:faculty.name,
            email:faculty.email,
            facultyId:faculty.facultyId,
        })
    }else{
        res.status(404)
        throw new Error('faculty not found')
    }
});

export {facultyRegister,facultyAuth,getFacultyProfile}