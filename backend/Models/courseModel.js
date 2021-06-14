import mongoose from 'mongoose'

const courseSchema = mongoose.Schema({
    faculty:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Faculty'
    },
    courseName:{
        type:String,
        required:true
    },
    courseCode:{
        type:String,
        required:true,
        unique:true
    },
    students:[String],
    courseAtttedances:[{
            presentStudents:{type:Array,default:[]},
            absentStudents:{type:Array,default:[]},
            numberOfPresentStudents:{type:Number},
            numberOfAbsentStudents:{type:Number},
            date:{type:Date}
        }]
},
{
    timestamps:true
})

const Course = mongoose.model('Course', courseSchema)

export default Course