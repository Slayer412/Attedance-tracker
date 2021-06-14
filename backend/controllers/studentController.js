import Student from '../Models/studentModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler( async (req,res) => {
    const {email,password} = req.body
    const student =await Student.findOne({email})
    if(student && (student.password === password)){
        res.json({
            _id:student._id,
            name:student.name,
            email:student.email,
            enrollmentNo:student.enrollmentNo,
            password:student.password,
            token:generateToken(student._id)
        })
    }else{
        res.status(401)
        throw new Error ('Invalid Email or password')
    }
});

const studentRegister = asyncHandler( async (req,res) => {
    const {name,email,enrollmentNo,password} = req.body

    const userExists = await Student.findOne({enrollmentNo})

    if(userExists){
        res.status(400)
        throw new Error("Student already registered")
    }

    const student = await Student.create({
        name,
        email,
        enrollmentNo,
        password
    })

    if(student){
        res.json({
            _id:student._id,
            name:student.name,
            email:student.email,
            enrollmentNo:student.enrollmentNo,
            token:generateToken(student._id),
        })
    }else{
        throw new Error('User not found')
    }


})

// @ desc Get student profile
// @route GET /api/student/profile
// @access privateStudent
const getStudentProfile = asyncHandler( async (req,res) => {
    const student = await Student.findById(req.user._id)
    if(student){
        res.json({
            _id:student._id,
            name:student.name,
            email:student.email,
            enrollmentNo:student.enrollmentNo,
        })
    }else{
        res.status(404)
        throw new Error('Student not found')
    }
});

const getStudents = asyncHandler(async(req,res) => {
    const student = await Student.find({})
    res.json(student)
})
export {studentRegister,authUser,getStudents,getStudentProfile}