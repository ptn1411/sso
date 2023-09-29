import { Router } from 'express'
import { getUserByAppIdAndToken } from '../services/userLink'
import { JwtGenerateTokens } from '../services/jwt'
const router = Router()
router.post('/', async (req, res) => {
  const { app_id } = req.query
  const { ssoToken } = req.body
  if (app_id && ssoToken) {
    const appId = app_id as string
    const userLink = await getUserByAppIdAndToken(appId, ssoToken)
    if (!userLink) {
      return res.json({
        status: true,
        error: 'error'
      })
    }
    const token = await JwtGenerateTokens({
      userId: userLink.user.id,
      appId: userLink.SSOProvider.id,
      updatedAt: userLink.user.updatedAt
    })
    return res.json(
      Object.assign(
        {},
        {
          status: true,
          user: userLink.user,
          app: userLink.SSOProvider,
          ...token
        }
      )
    )
  }
  return res.json({
    status: true,
    error: 'error'
  })
})
export default router
