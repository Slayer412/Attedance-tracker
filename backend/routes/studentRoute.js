import express from 'express'
const router = express.Router()
import {authUser, studentRegister,getStudents, getStudentProfile} from '../controllers/studentController.js'
import { protectStudent } from '../middleware/authMiddleware.js'
router.route('/').post(studentRegister).get(getStudents)
router.post('/login',authUser)
router.route('/profile').get(protectStudent,getStudentProfile)
export default router