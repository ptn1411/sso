import { Router } from 'express'
import { JwtGenerateTokens } from '../services/jwt'
import { RegisterSchema, createUser } from '../services/user'
const router = Router()

router.post('/', async (req, res) => {
  const { name, email, username, password } = req.body

  try {
    const user = await RegisterSchema.validate({ name, email, username, password })

    const newUser = await createUser(user)
    if (newUser.error) {
      return res.json({
        status: false,
        error: newUser.error
      })
    }
    if (newUser.data) {
      const token = await JwtGenerateTokens({
        userId: newUser.data.id,
        updatedAt: newUser.data.updatedAt
      })
      req.session.userId = newUser.data.id
      return res.json(
        Object.assign(
          {},
          {
            status: true,
            ...token
          }
        )
      )
    }
    return res.json({
      status: true,
      error: 'error'
    })
  } catch (error: any) {
    return res.json({
      status: false,
      error: error
    })
  }
})
export default router
