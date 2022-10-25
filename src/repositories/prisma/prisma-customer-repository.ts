import { RefreshToken } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { isAfter } from 'date-fns';
import { prisma } from '../../prisma'
import { GenerateRefreshTokenProvider } from '../../providers/GenerateRefreshToken';
import { GenerateTokenProvider } from '../../providers/GenerateToken';
import { CustomerRepository, Customer } from '../customer-repository'
import { BadRequestError } from '../../exception-handling/exceptions/bad-request-error';
import { ValidationError } from '../../exception-handling/exceptions/validation-error';
import { HttpStatusCode } from '../../exception-handling/http-status-code';

export class PrismaCustomerRepository implements CustomerRepository {
  async createCustomer({ email, password }: Customer): Promise<any> {
    const customerAlreadyExists = await prisma.customer.findFirst({
      where: {
        email
      }
    })
    if (customerAlreadyExists) {
      throw new ValidationError(HttpStatusCode.BAD_REQUEST, "Já existe um cliente com este e-mail."); 
    }

    const passwordHash = await hash(password, 8);

    const customer = await prisma.customer.create({
      data: {
        email,
        password: passwordHash
      }
    })
    
    return customer
  }  
  
  async sessionCustomer({ email, password }: Customer): Promise<any> {
    const customerAlreadyExists = await prisma.customer.findFirst({
      where: {
        email
      },
      include: {
        RefreshToken: true
      }
    })
    
    if (!customerAlreadyExists) {
      throw new ValidationError(HttpStatusCode.BAD_REQUEST, "E-mail ou senha incorretos."); 
    }

    const passwordMatch = await compare(password, customerAlreadyExists.password);
    if(!passwordMatch) {
      throw new ValidationError(HttpStatusCode.BAD_REQUEST, "E-mail ou senha incorretos."); 
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const token = await generateTokenProvider.createToken(customerAlreadyExists.id)

    //verificar se existe um refresh token e que não esteja expirado
    let refreshToken: RefreshToken | null = null 
    if (!customerAlreadyExists.RefreshToken) { // Caso em que não existe refresh token no banco de dados
      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
      refreshToken = await generateRefreshTokenProvider.createRefreshToken(customerAlreadyExists.id)
    } else { // Caso em que existe refresh token no banco de dados
      //verificar se está expirado
      const expired = isAfter(new Date(), customerAlreadyExists.RefreshToken.expiresIn)
      if (expired) { //Criar novo refresh token
        const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
        await generateRefreshTokenProvider.deleteRefreshToken(customerAlreadyExists.RefreshToken.customerId)
        refreshToken = await generateRefreshTokenProvider.createRefreshToken(customerAlreadyExists.RefreshToken.customerId)
      } else { // refresh token existe e não está expirado
        refreshToken = customerAlreadyExists.RefreshToken
      }
    }
    return { token, refresh_token: refreshToken}
  }

  async refreshToken(refresh_token: string) {
    const refreshTokenInPrisma = await prisma.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    })
    
    if (!refreshTokenInPrisma) {
      throw new BadRequestError("Refresh token invalid."); 
    }

    const expired = isAfter(new Date(), refreshTokenInPrisma.expiresIn)
    let newRefreshToken: RefreshToken | undefined = undefined
    if (expired) {
      const generateRefreshTokenProvider = new GenerateRefreshTokenProvider()
      await generateRefreshTokenProvider.deleteRefreshToken(refreshTokenInPrisma.customerId)
      newRefreshToken = await generateRefreshTokenProvider.createRefreshToken(refreshTokenInPrisma.customerId)
    }

    const generateTokenProvider = new GenerateTokenProvider()
    const newToken = await generateTokenProvider.createToken(refreshTokenInPrisma.customerId)
    
    if (newRefreshToken) {
      return { new_token: newToken, new_refresh_token: newRefreshToken }
    } else {
      return { new_token: newToken, refresh_token: refreshTokenInPrisma }
    }
  }

  async getCustomerByToken(token: string) {
    const generateTokenProvider = new GenerateTokenProvider()
    const payload = await generateTokenProvider.verifyToken(token)
    
    if (payload && typeof payload !== 'string'){
      const customer = await prisma.customer.findFirst({
        where: {
          id: payload.sub
        }
      })
      return {email: customer?.email}
    }
  }

  async getMyPurchases(customerId: string) {
    console.log('getCustomerByToken')
    
    const response = await prisma.customer.findFirst({
      where: {
        id: customerId
      },
      select: {
        orders: {
          select: {
            id: true,
            createdAt: true,
            customer: {
              select: {
                id: true,
                email: true
              }
            },
            orderCoffee: {
              select: {
                coffee: {
                  select: {
                    id: true,
                    price: true,
                    name: true,
                    image: true,
                    description: true,
                  }
                },
                quantity: true,
              }
            },
            point: {
              select: {
                lat: true,
                lng: true,
                features: {
                  select: {
                    city: true,
                    complement: true,
                    neighborhood: true,
                    number: true,
                    postalCode: true,
                    state: true,
                    street: true,
                  }
                }
              }
            },
            payment: {
              select: {
                price: true,
                method: true
              }
            }
          }
        }
      }
    })
    return response
  }

  async tokenExpired(token: string) {
    const generateTokenProvider = new GenerateTokenProvider()
    const response = await generateTokenProvider.isTokenExpired(token)
    return response
  }
}
