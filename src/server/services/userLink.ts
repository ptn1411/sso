import prisma from '../prisma'
import { uuid } from 'uuidv4'

export const createUserLink = async (userId: string, appId: string) => {
  const userLink = await getUserByUserIdAndAppId(userId, appId)
  if (userLink) {
    return userLink
  }
  const newUserLink = await prisma.userLink.create({
    data: {
      userId: userId,
      SSOProviderId: appId,
      token: uuid()
    },
    select: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          updatedAt: true
        }
      },
      SSOProvider: {
        select: {
          id: true,
          name: true,
          homepageURL: true,
          callbackURL: true
        }
      },
      token: true
    }
  })
  return newUserLink
}
export const getUserByUserIdAndAppId = async (userId: string, appId: string) => {
  const userLink = await prisma.userLink.findFirst({
    where: {
      OR: [
        {
          userId: userId
        },
        {
          SSOProviderId: appId
        }
      ]
    },
    select: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          updatedAt: true
        }
      },
      SSOProvider: {
        select: {
          id: true,
          name: true,
          homepageURL: true,
          callbackURL: true
        }
      },
      token: true
    }
  })
  return userLink
}
export const getUserByAppIdAndToken = async (appId: string, token: string) => {
  const userLink = await prisma.userLink.findFirst({
    where: {
      OR: [
        {
          SSOProviderId: appId
        },
        {
          token: token
        }
      ]
    },
    select: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          updatedAt: true
        }
      },
      SSOProvider: {
        select: {
          id: true,
          name: true,
          homepageURL: true,
          callbackURL: true
        }
      },
      token: true
    }
  })
  return userLink
}
