import { Router } from 'express'
import login from './login'
import register from './register'
import veriySsoToken from './verifySsoToken'
const router = Router()
router.use('/login', login)
router.use('/register', register)
router.use('/verifytoken', veriySsoToken)
export default router
