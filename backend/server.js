import express from 'express'
import dotenv from 'dotenv'
import studentRoute from './routes/studentRoute.js'
import facultyRoute from './routes/facultyRoute.js'
import courseRoute from './routes/courseRoute.js'
import connectDB from './config/db.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'
import Course from './Models/courseModel.js'
const app = express()
// app.post('/api/course/addStudentsToCourse',function(req, res, next){
//     // const courseCode = req.body.courseCode
//     const studentId = req.body.studentId
//     console.log(studentId)
//     const course = Course.findOne({courseCode:courseCode})
//     course.exec((err,data)=>{
//         if(data == null){
//             console.log('Course Not found')
//         }else{
//             console.log(data)
//         }
//     })
// })
dotenv.config()
app.use(express.json())
connectDB()
app.get('/',(req,res)=>{
    res.send("Attedance app is running....")
})
app.use('/api/student',studentRoute);
app.use('/api/faculty',facultyRoute);
app.use('/api/course',courseRoute);
app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(PORT,console.log("Server is running on port 5000"))