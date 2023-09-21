import {Router} from 'express'

const router = Router()

router.post('/', (req, res) => {
    const {name, email, username, password} = req.body

    res.send({name, email, username, password})
})
export default router
