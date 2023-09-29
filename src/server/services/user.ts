import { InferType } from 'yup'
import prisma from '../prisma'
import * as Yup from 'yup'
import * as argon2 from 'argon2'

export const RegisterSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  password: Yup.string().min(5).max(16).required('Password is required'),
  name: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required')
})
type UserRegister = InferType<typeof RegisterSchema>
type User = {
  id: string
  email: string
  name: string
  username: string
  role: string
  updatedAt: Date
}
interface FunUser<T> {
  data?: T
  error?: Error
}
export const createUser = async (user: UserRegister): Promise<FunUser<User>> => {
  try {
    const userValidateEmail = await getUserByEmail(user.email)
    const userValidateUsername = await getUserByUsername(user.username)
    if (userValidateEmail.data) {
      return {
        error: {
          name: 'email',
          message: 'Email đã tồn tại'
        }
      }
    }
    if (userValidateUsername.data) {
      return {
        error: {
          name: 'username',
          message: 'Username đã tồn tại'
        }
      }
    }
    const hashPassword = await argon2.hash(user.password)
    const newUser = await prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        name: user.name,
        password: hashPassword
      }
    })
    return {
      data: newUser
    }
  } catch (error: any) {
    return {
      error: error
    }
  }
}
export const getUserByUsername = async (username: string): Promise<FunUser<User>> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: username
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        updatedAt: true
      }
    })
    if (!user) {
      return {
        error: {
          name: 'User error',
          message: 'Tài khoản không tồn tại'
        }
      }
    }
    return {
      data: user
    }
  } catch (error: any) {
    return {
      error: error
    }
  }
}

export const getUserByEmail = async (email: string): Promise<FunUser<User>> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        updatedAt: true
      }
    })
    if (!user) {
      return {
        error: {
          name: 'User error',
          message: 'Tài khoản không tồn tại'
        }
      }
    }
    return {
      data: user
    }
  } catch (error: any) {
    return {
      error: error
    }
  }
}
export const getUserById = async (id: string): Promise<FunUser<User>> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id
      },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        role: true,
        updatedAt: true
      }
    })
    if (!user) {
      return {
        error: {
          name: 'User error',
          message: 'Tài khoản không tồn tại'
        }
      }
    }
    return {
      data: user
    }
  } catch (error: any) {
    return {
      error: error
    }
  }
}
