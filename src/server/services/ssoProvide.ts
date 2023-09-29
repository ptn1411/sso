import prisma from '../prisma'

export const getAppById = async (appId: string) => {
  const app = await prisma.sSOProvider.findFirst({
    where: {
      id: appId
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
          role: true,
          updatedAt: true
        }
      },
      name: true,
      token: true,
      homepageURL: true,
      callbackURL: true,
      createdAt: true,
      updatedAt: true
    }
  })
  if (!app) {
    return {
      error: {
        name: 'APP',
        message: 'app không tồn tại'
      }
    }
  }
  return {
    data: app
  }
}
