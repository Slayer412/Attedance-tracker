import express from 'express'
const router = express.Router()
const app = express()
import {protect} from '../middleware/authMiddleware.js'
import {addCourse,addStudentsToCourse, attedance, getAllCourse, getCourseById, studentPresent} from '../controllers/courseController.js'

router.route('/').post(protect,addCourse).get(protect, getAllCourse)
router.route('/addStudentsToCourse').post(protect,addStudentsToCourse)
router.route('/:id').get(getCourseById).post(protect,attedance)
router.route('/faculty/student/:id').get(protect,studentPresent)
router.route('/student/:id').get(studentPresent)

export default router