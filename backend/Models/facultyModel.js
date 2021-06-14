import mongoose from 'mongoose'

const facultySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    facultyId:{
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

const Faculty = mongoose.model('Faculty',facultySchema)

export default Faculty