import express from 'express'
import {protect} from '../middleware/authMiddleware.js'
const router = express.Router()
import {facultyRegister,facultyAuth, getFacultyProfile} from '../controllers/facultyController.js'
router.route('/').post(facultyRegister)
router.post('/login',facultyAuth)
router.route('/profile').get(protect,getFacultyProfile)
export default router