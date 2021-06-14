import asyncHandler from 'express-async-handler'
import Course from '../Models/courseModel.js'
const addCourse = asyncHandler(async(req,res)=>{
    const {courseCode,courseName} = req.body
    const courseExists = await Course.findOne({courseCode})
    if(courseExists){
        res.status(400)
        throw new Error("This course is already exists")
    }

    const course = await Course({
        faculty:req.user._id,
        courseName:courseName,
        courseCode:courseCode,
    })

    const createdCourse = await course.save()
    res.status(201).json(createdCourse)
})

const addStudentsToCourse = asyncHandler(async(req,res)=>{
    const {courseCode, selectedStudent} = req.body
    
    const course = await Course.findOneAndUpdate({courseCode:courseCode},{$addToSet:{students:selectedStudent}})
    
    res.json(course)
})

const getAllCourse = asyncHandler(async(req,res)=>{
    const course = await Course.find({})
    res.json(course)
})

const getCourseById = asyncHandler(async(req,res)=>{
    const course = await Course.findById(req.params.id)
    // const presentStudents = course.courseAtttedances;
    // // console.log(presentStudents)
    // presentStudents.map(st=>(console.log(st.presentStudents),
    // console.log(st.date)
    // ))
    if(course){
        res.json(course)
    }else{
        res.status(404)
        throw new Error('Course not found')
    }
})

const studentPresent = asyncHandler(async(req,res)=>{
    const course = await Course.find({students:{$all:[req.params.id]}})
    if(course){
        res.json(course)
    }else{
        res.status(404)
        throw new Error('Course not found')
    }
})

const attedance = asyncHandler( async(req,res)=>{
    const presentStudents = req.body.presentStudents
    const date = req.body.date
    console.log(req.params.id)
    const courseFind = await Course.findOne({_id:req.params.id})
    const students = courseFind.students;
    const absentStudent = [];
    students.forEach((student)=>{
        if(!presentStudents.includes(student)){
            absentStudent.push(student);
        }})
    
    const course = await Course.findOneAndUpdate({_id:req.params.id},{$push:{courseAtttedances:{
        presentStudents:presentStudents,
        absentStudents:absentStudent,
        numberOfPresentStudents:presentStudents.length,
        numberOfAbsentStudents:absentStudent.length,
        date:date
    }}})
    res.json(course)

})

export {addCourse,addStudentsToCourse,getAllCourse,getCourseById,attedance,studentPresent}