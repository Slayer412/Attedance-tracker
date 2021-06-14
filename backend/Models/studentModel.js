import mongoose from 'mongoose'

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    enrollmentNo:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},
{
    timestamps:true
})

const Student = mongoose.model('Student',studentSchema)

export default Student