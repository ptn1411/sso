import { useEffect } from 'react'

import { useSelector } from 'react-redux'

import { ReduxState } from '../store/rootReducer'

import { useNavigate, useLocation } from 'react-router-dom'

export default function () {
  const user = useSelector((state: ReduxState) => state.app.main.user)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const routers = ['/register', '/login']

  useEffect(() => {
    if (user) {
      if (routers.includes(pathname)) {
        return navigate('/')
      }
    }
  }, [user, navigate, routers, pathname])
  return user
}
