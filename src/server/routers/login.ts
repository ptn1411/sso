import { Router } from 'express'
import { LoginSchema, getUserByUsernameAndPassword } from '../services/user'
import { getAppById } from '../services/ssoProvide'
import { createUserLink } from '../services/userLink'

const router = Router()

router.get('/', async (req, res, next) => {
  const { app_id } = req.query

  if (req.session.userId !== null && app_id === null) return res.redirect('/')
  if (req.session.userId !== undefined && app_id !== null) {
    const appId = app_id as string
    const userLink = await createUserLink(req.session.userId, appId)
    return res.redirect(`${userLink.SSOProvider.callbackURL}?ssoToken=${userLink.token}`)
  }
  return next()
})

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body
    const { app_id } = req.query

    const userValidate = await LoginSchema.validate({
      username,
      password
    })
    const user = await getUserByUsernameAndPassword(userValidate.username, userValidate.password)
    if (user.error) {
      return res.redirect('/login')
    }
    if (user.data) {
      req.session.userId = user.data?.id
      if (app_id === null) {
        return res.redirect('/')
      }
      const appId = app_id as string
      const app = await getAppById(appId)
      if (app.error) {
        return res.redirect('/')
      }
      const userLink = await createUserLink(user.data.id, appId)

      return res.redirect(`${app.data.callbackURL}?ssoToken=${userLink.token}`)
    }
  } catch (error) {
    return res.redirect('/login')
  }
})
export default router
