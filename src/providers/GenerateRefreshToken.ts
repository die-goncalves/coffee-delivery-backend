import { prisma } from '../prisma'
import { addMonths } from 'date-fns'

export class GenerateRefreshTokenProvider {
  async createRefreshToken (customerId: string): Promise<any> {
    const expiresIn = addMonths(new Date(), 6)
    
    const refreshTokenAlreadyExists = await prisma.refreshToken.findFirst({
      where: {
        customerId
      }
    })

    if (refreshTokenAlreadyExists) {
      throw new Error("Já existe um refresh token");
    }

    const refreshToken = await prisma.refreshToken.create({
      data: {
        customerId,
        expiresIn
      }
    })

    return refreshToken
  }

  async deleteRefreshToken (customerId: string): Promise<any> {
    await prisma.refreshToken.delete({
      where: {
        customerId
      }
    })
  }
}
