import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  const { serviceURL } = req.query
  console.log('req.session.userId')
  console.log(req.session.userId)
  req.session.userId = `${Math.random()}+${Date.now()}`

  next()
})

router.post('/', (req, res) => {
  const { username, password } = req.body

  res.send({ username, password })
})
export default router
